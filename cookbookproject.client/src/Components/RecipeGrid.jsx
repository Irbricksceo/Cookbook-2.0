import RecipePreview from './RecipePreview'
import { dummyRecipeList } from '../Resources/Constants'
import { useLocation } from 'react-router'
function RecipeGrid() {

    const location = useLocation()
    const { navCategory } = location.state
    let recipeList = dummyRecipeList
    if (navCategory != "All") {
        if (navCategory == "Favorites") {
            recipeList = recipeList.filter((recipe) => recipe.isFavorite == true)
        } else {
            recipeList = recipeList.filter((recipe) => recipe.category == navCategory)
        }
    }

    return (
        <div>
            <div className="contentHeader">
                <h3>Recipe List</h3>
            </div>
            <div>
                <p>Showing All Recipies of Type {navCategory}</p>
                <br></br>
                {recipeList.map((recipe) => (
                    <RecipePreview key={recipe.id}  recipe={recipe}></RecipePreview>
                ))}
            </div>
        </div>
  );
}

export default RecipeGrid;