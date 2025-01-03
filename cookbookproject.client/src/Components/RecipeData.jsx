import { useLocation } from 'react-router'
function RecipeData() {
    //retrieve recipe from state
    const location = useLocation()
    const { recipeInfo } = location.state

    return (
      <div>
            <h2>{recipeInfo.name}</h2>
            <h3>Recipe By: {recipeInfo.creator }</h3>
            <p>Prep Time: {recipeInfo.prepTime}</p>
            <p>Cook Time: {recipeInfo.cookTime}</p>
            {recipeInfo.servingsCount ? <p>Serves {recipeInfo.servingsCount}</p> : <p>Serving Count Not Specified</p>}
            <br></br>

            <h3>Ingredients</h3>
            <p>{recipeInfo.ingredients}</p>
            <br></br>

            <h3>Directions</h3>
            <p>{recipeInfo.steps}</p>
      </div>
  );
}

export default RecipeData;