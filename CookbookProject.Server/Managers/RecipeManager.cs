using CookbookProject.Server.Data;
using Google.Protobuf.WellKnownTypes;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.Crmf;
using System.Data;

namespace CookbookProject.Server.Managers
{
    public class RecipeManager
    {
        public RecipeManager() { }

        public void createRecipe(Recipe recipe, String conString)
        {
            //Recipe recipe1 = new Recipe("Spaghetti Bolognese", "Italian", "Spaghetti, ground beef, tomato sauce, onions, garlic", "1. Cook spaghetti. 2. Brown beef with onions and garlic. 3. Add tomato sauce and simmer. 4. Serve sauce over spaghetti.", "Chef Mario", "15 mins", "30 mins");

            //write to DB
        }

        public void updateRecipe(Recipe recipe, String conString)
        { 
            //write to DB
        }

        public void deleteRecipe(Guid id, String conString)
        { 
            // db call to delete recipe by id
        }

        public Recipe? getRecipe(Guid id, String conString)
        {
            Recipe? recipe = null;
            //call DB for actual, placeholder for now
            return recipe;
        }

        public List<Recipe> GetRecipesByCategory(String category, String conString)
        {
            List<Recipe> recipes = new List<Recipe>();
            //call DB for list of recipes, format as JSON if needed


            return recipes;
        }

        public List<Recipe> GetAllRecipes(String conString)
        {
            string query = "SELECT * FROM recipes";
            List<Recipe> recipes = executeQueryGetData(query, conString);
            return recipes;
        }
        
        public void executeQuery(string query, String conString)
        {
            //execute query against DB, return results as needed
        }

        public List<Recipe> executeQueryGetData(string query, String conString)
        {
            List<Recipe> recipes = new List<Recipe>();
            MySqlConnection con = new MySqlConnection(conString);
            con.Open();
            MySqlCommand cmd = new MySqlCommand(query, con);

            using (MySqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                   Recipe recipe = new Recipe
                    {
                        Id = reader.GetGuid("Id"),
                        Name = reader.GetString("Name"),
                        Category = reader.GetString("Category"),
                        Ingredients = reader.GetString("Ingredients"),
                        Steps = reader.GetString("Steps"),
                        Creator = reader.GetString("Creator"),
                        PrepTime = reader.GetString("PrepTime"),
                        CookTime = reader.GetString("CookTime"),
                        servingsCount = reader.GetInt32("servingsCount"),
                        isFavorite = reader.GetBoolean("isFavorite")
                    };
                    recipes.Add(recipe);
                }
            }

            return recipes;
        }
    }
}
