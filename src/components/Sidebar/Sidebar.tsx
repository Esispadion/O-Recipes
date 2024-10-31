import './Sidebar.css'
import type IRecipe from '../../@types/recipe.d.ts';

interface SidebarProps {
  recipes: IRecipe[];
}

function Sidebar({recipes}: SidebarProps) {
    return( 
    <div className='sidebar'>
        <ul>
            {recipes.map(recipe => (
          <li key={recipe.id}>
          </li>
        ))}
        </ul>
    </div>
 )
}

export default Sidebar;