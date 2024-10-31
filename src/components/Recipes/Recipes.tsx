import { Button, Card } from 'semantic-ui-react';
import './Recipes.css'
import type IRecipe from '../../@types/recipe.d.ts';
import { Link } from 'react-router-dom';

interface RecipesProps {
  recipes: IRecipe[];
}

function Recipes({recipes}: RecipesProps) {
    return (
        <div className='recipes'>
            <h1>Toutes nos recettes</h1>
            <h2>Voici nos recettes</h2>

            <Card.Group itemsPerRow={3}>
                {recipes.map(recipe => (
                    <Card
                        key={recipe.id}
                        image={recipe.thumbnail}
                        header={recipe.title}
                        meta={recipe.difficulty}
                        extra={<Button>Voir la recette</Button>}
                        as={Link}
                        to={`/recipe/${recipe.slug}`}
                    />
                ))}
            </Card.Group>
        </div>
    )
}

export default Recipes;

