import { NavLink } from "react-router-dom";
import type IRecipe from "../../@types/recipe";
import "./Sidebar.css";
import { useContext } from "react";
import { MyContext } from "../../App";

interface SidebarProps {
  recipes: IRecipe[];
}

function Sidebar({ recipes }: SidebarProps) {
  const isConnected = useContext(MyContext);

  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/">Accueil</NavLink>
        </li>
        {isConnected && (
          <li>
            <NavLink to="/favorites">Mes recettes pref ❤️</NavLink>
          </li>
        )}
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <NavLink to={`/recipe/${recipe.slug}`}>{recipe.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
