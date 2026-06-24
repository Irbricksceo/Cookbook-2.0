import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom"
import '../Styles/RecipePreview.css';

function RecipePreview(props) {
    const recipeDetails = props.recipe;

    return (
        <NavLink
            className="recipePreviewLink"
            to="/Recipe/"
            state={{ recipeInfo: recipeDetails }}
        >
            <div className="recipePreview">
                <h3>{recipeDetails.name}</h3>
                <div className="recipePreviewMeta">
                    <span>Prep: {recipeDetails.prepTime} min</span>
                    <span>Cook: {recipeDetails.cookTime} min</span>
                </div>
            </div>
        </NavLink>
    );
}

export default RecipePreview;
