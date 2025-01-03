
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom"
import '../Styles/RecipePreview.css';
function RecipePreview(props) {

   let recipeDetails = props.recipe

    //RecipePreview.propTypes = {
    //    recipeId: PropTypes.string
    //};

    return (
        <NavLink
            to="/Recipe/"
            state={{ recipeInfo: recipeDetails }}
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