import { useLocation } from 'react-router'
import { NavLink } from "react-router-dom"
import '../Styles/RecipeData.css'

function RecipeData() {
    const location = useLocation()
    const { recipeInfo } = location.state

    return (
        <div>
            <div className="contentHeader">
                <h2>{recipeInfo.name}</h2>
            </div>
            <div className="recipeCard">
                <div className="recipeCardHeader">
                    <p className="recipeCreator">By {recipeInfo.creator}</p>
                    <div className="recipeMeta">
                        <span className="metaChip">Prep: {recipeInfo.prepTime} min</span>
                        <span className="metaChip">Cook: {recipeInfo.cookTime} min</span>
                        {recipeInfo.servingsCount
                            ? <span className="metaChip">Serves {recipeInfo.servingsCount}</span>
                            : null}
                    </div>
                    <NavLink
                        className="editButton"
                        to="/CreateEditRecipe"
                        state={{ editingRecipe: recipeInfo }}
                    >Edit Recipe</NavLink>
                </div>

                <div className="recipeSection">
                    <h3>Ingredients</h3>
                    <p>{recipeInfo.ingredients}</p>
                </div>

                <div className="recipeSection">
                    <h3>Directions</h3>
                    <p>{recipeInfo.steps}</p>
                </div>
            </div>
        </div>
    );
}

export default RecipeData;
