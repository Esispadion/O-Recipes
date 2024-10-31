import './Sidebar.css'
import type IRecipe from '../../@types/recipe.d.ts';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  recipes: IRecipe[];
}

function Sidebar({recipes}: SidebarProps) {
    return( 
    <div className="sidebar">
        <ul>
          <li>
            <NavLink to='/'>Accueil</NavLink>
          </li>
            {recipes.map((recipe) => (
          <li key={recipe.id}>
            <NavLink to={`/recipe/${recipe.slug}`}>{recipe.title}</NavLink>
          </li>
        ))}
        </ul>
    </div>
 )
}

export default Sidebar;