import RecipePreview from './RecipePreview'
import { dummyRecipeList } from '../Resources/Constants'
import { useLocation } from 'react-router'
import { useEffect, useState } from 'react'

function RecipeGrid() {

    const location = useLocation()
    const { navCategory } = location.state
    const [recipeList, setRecipeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function getRecipeList() {
            try {
                setLoading(true);
                const res = await fetch(`https://localhost:7041/api/recipes/all`);
                const data = await res.json();
                if (mounted) setRecipeList(data);
            } catch (err) {
                // optionally handle error
                console.error('Failed to load recipes', err);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        getRecipeList();
        return () => { mounted = false; };
    }, [])
    

    if (navCategory != "All") {
        if (navCategory == "Favorites") {
            recipeList = recipeList.filter((recipe) => recipe.isFavorite == true)
        } else {
            recipeList = recipeList.filter((recipe) => recipe.category == navCategory)
        }
    }
    if (loading) {
        return <div>Loading recipes...</div>;
    }

    const displayed = recipeList;

    return (
                <div>
                    <div className="contentHeader">
                        <h3>Recipe List</h3>
                    </div>
                    <div>
                        <p>Showing All Recipies of Type {navCategory}</p>
                        <br></br>
                        {displayed.map((recipe) => (
                            <RecipePreview key={recipe.id} recipe={recipe}></RecipePreview>
                        ))}
                    </div>
                </div>
              );
}

export default RecipeGrid;