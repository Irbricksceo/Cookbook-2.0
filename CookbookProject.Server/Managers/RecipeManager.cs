using CookbookProject.Server.Data;

namespace CookbookProject.Server.Managers
{
    public class RecipeManager
    {
        public RecipeManager() { }

        public void createRecipe(Recipe recipe)
        {
            //write to DB
        }

        public void updateRecipe(Recipe recipe)
        { 
            //write to DB
        }

        public void deleteRecipe(Guid id)
        { 
            // db call to delete recipe by id
        }

        public Recipe? getRecipe(Guid id)
        {
            Recipe? recipe = null;
            //call DB for actual, placeholder for now
            return recipe;
        }

        public List<Recipe> GetRecipesByCategory(String category)
        {
            List<Recipe> recipes = new List<Recipe>();
            //these are placeholders
            Recipe recipe1 = new Recipe("Spaghetti Bolognese", "Italian", "Spaghetti, ground beef, tomato sauce, onions, garlic", "1. Cook spaghetti. 2. Brown beef with onions and garlic. 3. Add tomato sauce and simmer. 4. Serve sauce over spaghetti.", "Chef Mario", "15 mins", "30 mins");
            Recipe recipe2 = new Recipe("Chicken Curry", "Indian", "Chicken, curry powder, coconut milk, onions, garlic", "1. Sauté onions and garlic. 2. Add chicken and brown. 3. Stir in curry powder. 4. Pour in coconut milk and simmer until chicken is cooked through.", "Chef Anjali", "20 mins", "40 mins");
            recipes.Add(recipe1);
            recipes.Add(recipe2);
            //call DB for list of recipes, format as JSON if needed
            return recipes;
        }

        public List<Recipe> GetAllRecipes()
        {
            List<Recipe> recipes = new List<Recipe>();
            //these are placeholders
            Recipe recipe1 = new Recipe("Spaghetti Bolognese", "Italian", "Spaghetti, ground beef, tomato sauce, onions, garlic", "1. Cook spaghetti. 2. Brown beef with onions and garlic. 3. Add tomato sauce and simmer. 4. Serve sauce over spaghetti.", "Chef Mario", "15 mins", "30 mins");
            Recipe recipe2 = new Recipe("Chicken Curry", "Indian", "Chicken, curry powder, coconut milk, onions, garlic", "1. Sauté onions and garlic. 2. Add chicken and brown. 3. Stir in curry powder. 4. Pour in coconut milk and simmer until chicken is cooked through.", "Chef Anjali", "20 mins", "40 mins");
            recipes.Add(recipe1);
            recipes.Add(recipe2);
            //call DB for list of recipes, format as JSON if needed
            return recipes;
        }
    }
}
