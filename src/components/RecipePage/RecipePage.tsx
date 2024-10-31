import { Navigate, useParams } from "react-router-dom";
import type IRecipe from "../../@types/recipe";
import "./RecipePage.css";

interface RecipePageProps {
  recipes: IRecipe[];
}

export default function RecipePage({ recipes }: RecipePageProps) {
  const { slug } = useParams();

  const recipeToDisplay = recipes.find((recipe) => recipe.slug === slug);

  if (!recipeToDisplay) {
    return <Navigate to="/error" />;
  }

  return (
    <div className="recipe-page">
      <div className="photo-container">
        <img
          src={recipeToDisplay.thumbnail}
          className="photo"
          alt={recipeToDisplay.title}
        />
        <div className="infos">
          <h1>{recipeToDisplay.title}</h1>
          <div>Difficulty : {recipeToDisplay.difficulty}</div>
        </div>
      </div>

      <ul className="ingredients">
        {recipeToDisplay.ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <span>
              {ingredient.quantity} {ingredient.unit}
            </span>{" "}
            {ingredient.name}
          </li>
        ))}
      </ul>

      <ul className="instructions">
        {recipeToDisplay.instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ul>
    </div>
  );
}
