import { useEffect, useState } from 'react'
import axios from 'axios'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import Recipes from './components/Recipes/Recipes'
import RecipePage from './components/RecipePage/RecipePage'
import { Route, Routes, useLocation } from 'react-router-dom'
import ErrorPage from './components/ErrorPage/ErrorPage'

function App() {

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await axios.get("https://orecipesapi.onrender.com/api/recipes");
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
      top:0,
      left:0,
    });
  },[pathname]);

  return (
    <div className='app'>
      <Sidebar recipes={recipes} />
      <div className="rightbar">
        <Header /> 


        {isLoading ? (
          <div> ... chargement </div>
        ) : (
        <Routes>
          <Route path="/" element={<Recipes recipes={recipes} />} />
          <Route
            path="/recipe/:slug" 
            element={<RecipePage recipes={recipes}/>}
          />
          <Route path='*' element={<ErrorPage />}/>
        </Routes>
        )}



      </div>
    </div>
  )
}

export default App;
