import { createContext, useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Recipes from "./components/Recipes/Recipes";
import { Route, Routes, useLocation } from "react-router-dom";
import RecipePage from "./components/RecipePage/RecipePage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import FavPage from "./components/FavPage/FavPage";
import myAxiosInstance, {
  addTokenToAxiosInstance,
  removeTokenFromInstance,
} from "./axios/axios";
import {
  getTokenAndPseudoFromLocalStorage,
  removePseudoAndTokenFromLocalStorage,
  saveTokenAndPseudoInLocalStorage,
} from "./localstorage/localstorage";

export const MyContext = createContext(false);

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [pseudo, setPseudo] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);

  const logIn = async (emailFromInput: string, passFromInput: string) => {
    // on les envoie au back
    try {
      const response = await myAxiosInstance.post("/login", {
        email: emailFromInput,
        password: passFromInput,
      });
      console.log(response);
      setPseudo(response.data.pseudo);
      setIsConnected(true);
      setError(null);
      addTokenToAxiosInstance(response.data.token);
      saveTokenAndPseudoInLocalStorage(
        response.data.pseudo,
        response.data.token
      );
    } catch (e) {
      console.log(e);
      setError("erreur de connexion");
    }
  };

  const logOut = () => {
    setIsConnected(false);
    setPseudo(null);
    removeTokenFromInstance();
    removePseudoAndTokenFromLocalStorage();
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await myAxiosInstance.get("/recipes");
        console.log(result);
        setRecipes(result.data);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    fetchRecipes();
  }, []);

  const { pathname } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  useEffect(() => {
    const infosFromLocalStorage = getTokenAndPseudoFromLocalStorage();

    if (infosFromLocalStorage.pseudo) {
      setPseudo(infosFromLocalStorage.pseudo);
      setIsConnected(true);
    }
    if (infosFromLocalStorage.token) {
      addTokenToAxiosInstance(infosFromLocalStorage.token);
    }
  }, []);

  return (
    <MyContext.Provider value={isConnected}>
      <div className="app">
        <Sidebar recipes={recipes} />
        <div className="rightbar">
          <Header
            isConnected={isConnected}
            pseudo={pseudo}
            logIn={logIn}
            logOut={logOut}
            error={error}
          />

          {isLoading ? (
            <div>... chargement</div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <Recipes recipes={recipes} title="Les recettes Orecipes" />
                }
              />
              <Route
                path="/recipe/:slug"
                element={<RecipePage recipes={recipes} />}
              />
              {
                isConnected && <Route path="/favorites" element={<FavPage />} />
              }
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          )}
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
