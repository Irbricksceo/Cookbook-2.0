import { dummyRecipe } from '../Resources/Constants'
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom"
import '../Styles/RecipePreview.css';
function RecipePreview(props) {

   let recipeDetails = dummyRecipe;

    RecipePreview.propTypes = {
        recipeId: PropTypes.string
    };

    if (props.recipeId == null) {
        recipeDetails.name = "undefined Recipe"
    } else {
        //TODO: get recipe with ID from list instead of constant
        recipeDetails.name = "Defined Recipe"
    }


    return (
        <NavLink
            to="/Recipe"
            state={{ recipeId: recipeDetails.id }}
        >
        <div className="recipePreview">
            <h3>{recipeDetails.name}</h3>
            <p>Prep Time : {recipeDetails.prepTime}</p>
            <p>Cook Time: {recipeDetails.cookTime}</p>
            <br></br>
            </div>
        </NavLink>
    );
}

export default RecipePreview;