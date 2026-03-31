import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

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

    const navigate = useNavigate();

    //define the fields and initialize from editingItem
    const [recipeName, setRecipeName] = useState(editingItem.name || "");
    const [recipeCategory, setRecipeCategory] = useState(editingItem.category || "");
    const [ingredients, setIngredients] = useState(editingItem.ingredients || "");
    const [steps, setSteps] = useState(editingItem.steps || "");
    const [creator, setCreator] = useState(editingItem.creator || "");
    const [prepTime, setPrepTime] = useState(editingItem.prepTime ?? "");
    const [cookTime, setCookTime] = useState(editingItem.cookTime ?? "");
    const [servingsCount, setServingsCount] = useState(editingItem.servingsCount ?? "");
    const [isFavorite] = useState(editingItem.isFavorite ?? false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            // include id for edits
            ...(editingItem.id ? { id: editingItem.id } : {}),
            name: recipeName,
            category: recipeCategory,
            ingredients,
            steps,
            creator,
            prepTime,
            cookTime,
            servingsCount: servingsCount === '' ? null : Number(servingsCount),
            isFavorite
        };

        try {
            const url = editingItem.id && editingItem.id !== '' ? `https://localhost:7041/api/recipes/${editingItem.id}` : 'https://localhost:7041/api/recipes';
            const method = editingItem.id && editingItem.id !== '' ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `${res.status} ${res.statusText}`);
            }

            // on success navigate back to home or list
            navigate('/');
        } catch (err) {
            console.error('Failed to save recipe', err);
            alert('Failed to save recipe: ' + err.message);
        }
    };

    return (
        <div>
            <div className="contentHeader">
                <h3>Editing {editingItem.name}</h3>
            </div>
            <div className="editForm">
                <h3>Recipe Details</h3>
                <fieldset>
                    <form onSubmit={handleSubmit}>
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
                            <option value="">Select category</option>
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
                            value={ingredients}
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
                            value={steps}
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
                        >Submit</button>
                    </form>
                </fieldset>
            </div>
        </div>
  );
}

export default CreateEditRecipe;