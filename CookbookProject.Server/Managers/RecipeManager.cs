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

        public void deleteRecipe()
        { 
            //db call
        }

        public Recipe? getRecipe(Guid id)
        {
            Recipe? recipe = null;
            //call DB for 
           

            return recipe;
        }

        public List<Recipe> GetRecipesByCategory(String category)
        {
            List<Recipe> recipes = new List<Recipe>();
            //call DB for list of recipes, format as JSON if needed
            return recipes;
        }
    }
}
