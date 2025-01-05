import { useState } from 'react'
import { useLocation } from 'react-router'

function CreateEditRecipe() {

    //figure out if recipe was passed in, if so, we are editing that one. if not, we need to create blanks.
    const location = useLocation()
    const editingItem = location.state?.editingRecipe ? location.state.editingRecipe : {
        id: '',
        name: 'New Recipe',
        category: '',
        ingredients: '',
        steps: '',
        creator: '',
        prepTime: '',
        cookTime: '',
        servingsCount: '',
        isFavorite: false
    }

    //define the fields, still need to hook up the above
    const [recipeName, setRecipeName] = useState("");
    const [recipeCategory, setRecipeCategory] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const [creator, setCreator] = useState("");
    const [prepTime, setPrepTime] = useState(null);
    const [cookTime, setCookTime] = useState(null);
    const [servingsCount, setServingsCount] =useState(null);
    //const [isFavorite, setIsFavorite] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            recipeName,
            recipeCategory,
            ingredients,
            steps,
            creator,
            prepTime,
            cookTime,
            servingsCount
        )
    };

    return (
        <div>
            <div className="contentHeader">
                <h3>Editing {editingItem.name}</h3>
            </div>
            <div className="editForm">
                <h3>Recipe Details</h3>
                <fieldset>
                    <form action="#" method="get">
                        <input
                            type="text"
                            name="recipeName"
                            id="recipeName"
                            value={recipeName}
                            onChange={(e) =>
                                setRecipeName(e.target.value)
                            }
                            placeholder="Enter Recipe Name"
                            required
                        />
                        <select
                            name="recipeCategory"
                            id="recipeCategory"
                            value={recipeCategory}
                            onChange={(e) =>
                                setRecipeCategory(e.target.value)
                            }
                            required >
                            <option value="Appetizers">Appetizers</option>
                            <option value="Entrees">Entrees</option>
                            <option value="Deserts">Desserts</option>
                            <option value="Soups">Soups</option>
                            <option value="Salads">Salads</option>
                            <option value="Breads">Breads</option>
                        </select>
                        <br></br>
                        <input
                            type="text"
                            name="creator"
                            id="creator"
                            value={creator}
                            onChange={(e) =>
                                setCreator(e.target.value)
                            }
                            placeholder="Enter Recipe Creator"
                            required
                        />
                        <label htmlFor="servingsCount">How Many Servings:</label>
                        <input
                            type="number"
                            name="servingsCount"
                            id="servingsCount"
                            value={servingsCount}
                            onChange={(e) =>
                                setServingsCount(e.target.value)
                            }
                        />
                        <br></br>
                        <label htmlFor="prepTime">Enter Prep Time in Minutes:</label>
                        <input
                            type="number"
                            name="prepTime"
                            id="prepTime"
                            value={prepTime}
                            onChange={(e) =>
                                setPrepTime(e.target.value)
                            }
                        />
                        <label htmlFor="cookTime">Enter Cook Time in Minutes:</label>
                        <input
                            type="number"
                            name="cookTime"
                            id="cookTime"
                            value={cookTime}
                            onChange={(e) =>
                                setCookTime(e.target.value)
                            }
                        />
                        <br></br>
                        <textarea
                            name="ingredients"
                            id="ingredients"
                            cols="30"
                            rows="10"
                            onChange={(e) =>
                                setIngredients(e.target.value)
                            }
                            placeholder="Ingredients"
                            required
                        ></textarea>
                        <br></br>
                        <textarea
                            name="steps"
                            id="steps"
                            cols="30"
                            rows="10"
                            onChange={(e) =>
                                setSteps(e.target.value)
                            }
                            placeholder="Cooking Directions"
                            required
                        ></textarea>
                        <br></br>
                        <button
                            type="submit"
                            value="Submit"
                            onClick={(e) => handleSubmit(e)}
                        >Submit</button>
                    </form>
                </fieldset>
            </div>
        </div>
  );
}

export default CreateEditRecipe;