import { useEffect, useState } from 'react'
import axios from 'axios'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import Recipes from './components/Recipes/Recipes'

function App() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await axios.get("https://orecipesapi.onrender.com/api/recipes");
        console.log(result);
        setRecipes(result.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className='app'>
      <Sidebar recipes={recipes} />
      <div className="rightbar">
        <Header /> 
        <Recipes recipes={recipes} />
      </div>
    </div>
  )
}

export default App;
