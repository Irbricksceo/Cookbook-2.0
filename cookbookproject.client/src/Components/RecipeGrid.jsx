import RecipePreview from './RecipePreview'
//import constants from '../Resources/Constants'
import { useLocation } from 'react-router'
function RecipeGrid() {

    const location = useLocation()
    const getCategory = () => {
        const { navCategory } = location.state
        return navCategory
    }


    return (
      <div>
            <p>Recipe List</p>
            <p>Showing All Recipies of Type { getCategory() }</p>
            <RecipePreview recipeId="thisdoesn'tmatteryet"></RecipePreview>
            <RecipePreview></RecipePreview>
        </div>
  );
}

export default RecipeGrid;