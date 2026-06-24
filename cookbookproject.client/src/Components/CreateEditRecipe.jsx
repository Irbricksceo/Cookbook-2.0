import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import '../Styles/CreateEditRecipe.css'

function CreateEditRecipe() {

    //figure out if recipe was passed in, if so, we are editing that one. if not, we need to create blanks.
    const location = useLocation()
    const editingItem = location.state?.editingRecipe ? location.state.editingRecipe : {
        id: '',
        name: '',
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

    const isEditing = !!(editingItem.id && editingItem.id !== '');

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
            const url = isEditing ? `https://localhost:7041/api/recipes/${editingItem.id}` : 'https://localhost:7041/api/recipes';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `${res.status} ${res.statusText}`);
            }

            navigate('/');
        } catch (err) {
            console.error('Failed to save recipe', err);
            alert('Failed to save recipe: ' + err.message);
        }
    };

    return (
        <div>
            <div className="contentHeader">
                <h3>{isEditing ? `Editing ${editingItem.name}` : 'Add New Recipe'}</h3>
            </div>
            <div className="editForm">
                <fieldset>
                    <form onSubmit={handleSubmit}>
                        <h3 className="formTitle">Recipe Details</h3>
                        <div className="formGroup">
                            <label htmlFor="recipeName">Recipe Name</label>
                            <input
                                type="text"
                                name="recipeName"
                                id="recipeName"
                                value={recipeName}
                                onChange={(e) => setRecipeName(e.target.value)}
                                placeholder="Enter recipe name"
                                required
                            />
                        </div>

                        <div className="formRow formRow-3">
                            <div className="formGroup">
                                <label htmlFor="recipeCategory">Category</label>
                                <select
                                    name="recipeCategory"
                                    id="recipeCategory"
                                    value={recipeCategory}
                                    onChange={(e) => setRecipeCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Select category</option>
                                    <option value="Appetizers">Appetizers</option>
                                    <option value="Entrees">Entrees</option>
                                    <option value="Deserts">Desserts</option>
                                    <option value="Soups">Soups</option>
                                    <option value="Salads">Salads</option>
                                    <option value="Breads">Breads</option>
                                </select>
                            </div>
                            <div className="formGroup">
                                <label htmlFor="creator">Creator</label>
                                <input
                                    type="text"
                                    name="creator"
                                    id="creator"
                                    value={creator}
                                    onChange={(e) => setCreator(e.target.value)}
                                    placeholder="Enter creator"
                                    required
                                />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="servingsCount">Servings</label>
                                <input
                                    type="number"
                                    name="servingsCount"
                                    id="servingsCount"
                                    value={servingsCount}
                                    onChange={(e) => setServingsCount(e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="formRow formRow-2">
                            <div className="formGroup">
                                <label htmlFor="prepTime">Prep Time (minutes)</label>
                                <input
                                    type="number"
                                    name="prepTime"
                                    id="prepTime"
                                    value={prepTime}
                                    onChange={(e) => setPrepTime(e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="cookTime">Cook Time (minutes)</label>
                                <input
                                    type="number"
                                    name="cookTime"
                                    id="cookTime"
                                    value={cookTime}
                                    onChange={(e) => setCookTime(e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="formGroup">
                            <label htmlFor="ingredients">Ingredients</label>
                            <textarea
                                name="ingredients"
                                id="ingredients"
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                placeholder="List your ingredients here"
                                required
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="steps">Directions</label>
                            <textarea
                                name="steps"
                                id="steps"
                                value={steps}
                                onChange={(e) => setSteps(e.target.value)}
                                placeholder="Step-by-step cooking directions"
                                required
                            />
                        </div>

                        <button type="submit">
                            {isEditing ? 'Save Changes' : 'Add Recipe'}
                        </button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}

export default CreateEditRecipe;
