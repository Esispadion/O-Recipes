import { Button, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Recipes.css";
import type IRecipe from "../../@types/recipe";
import { useContext } from "react";
import { MyContext } from "../../App";

interface RecipesProps {
  recipes: IRecipe[];
  title: string;
}

function Recipes({ recipes, title }: RecipesProps) {
  const isConnected = useContext(MyContext);
  console.log(isConnected);

  return (
    <div className="recipes">
      <h1>{title}</h1>
      <p>Voici nos recettes</p>

      <Card.Group itemsPerRow={3}>
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            image={recipe.thumbnail}
            header={recipe.title}
            meta={recipe.difficulty}
            description={isConnected && <span>❤️</span>}
            extra={<Button>Voir la recette</Button>}
            as={Link}
            to={`/recipe/${recipe.slug}`}
          />
        ))}
      </Card.Group>
    </div>
  );
}

export default Recipes;
