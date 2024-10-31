import Recipes from "../Recipes/Recipes";
import { useEffect, useState } from "react";
import myAxiosInstance from "../../axios/axios";

export default function FavPage() {
  const [favRecipes, setFavRecipes] = useState([]);
  useEffect(() => {
    const getFavRecipes = async () => {
      try {
        const response = await myAxiosInstance.get("/favorites");
        console.log(response);
        setFavRecipes(response.data.favorites);
      } catch (e) {
        console.log(e);
      }
    };
    getFavRecipes();
  }, []);

  return <Recipes recipes={favRecipes} title="Vos recettes pref" />;
}
