import RecipePreview from './RecipePreview'

function RecipeGrid() {

    const getCategory = () => {
       
    }
    /*const getRecipeList = () => {
        
    }*/


    return (
      <div>
            <p>Recipe List</p>
            <p>Showing All Recipies of Type { getCategory() }</p>
            <RecipePreview></RecipePreview>
            <RecipePreview></RecipePreview>
        </div>
  );
}

export default RecipeGrid;