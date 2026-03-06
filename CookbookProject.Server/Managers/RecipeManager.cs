using CookbookProject.Server.Data;
using Google.Protobuf.WellKnownTypes;
using Microsoft.AspNetCore.Http.HttpResults;
using MySql.Data.MySqlClient;
using Mysqlx.Crud;
using Org.BouncyCastle.Asn1.Crmf;
using System.Data;
using System.Net;
using System.Xml.Linq;

namespace CookbookProject.Server.Managers
{
    public class RecipeManager
    {
        public RecipeManager() { }

        public void createRecipe(Recipe recipe, String conString)
        {
            //Recipe recipe1 = new Recipe("Spaghetti Bolognese", "Italian", "Spaghetti, ground beef, tomato sauce, onions, garlic", "1. Cook spaghetti. 2. Brown beef with onions and garlic. 3. Add tomato sauce and simmer. 4. Serve sauce over spaghetti.", "Chef Mario", "15 mins", "30 mins");
            String qry = "INSERT into recipes(Id, Name, Category, Ingredients, Steps, Creator, PrepTime, CookTime, servingsCount, isFavorite) VALUES ( " + recipe.Id + ", " + recipe.Name + ", " + recipe.Category + ", " + recipe.Ingredients + ", " + recipe.Steps + ", " + recipe.Creator + ", "+ recipe.PrepTime + ", " + recipe.CookTime + ", " + recipe.servingsCount + ", " + recipe.isFavorite + ')';
            executeQuery(qry, conString);
        }

        public void updateRecipe(Recipe recipe, String conString)
        { 
            String qry = "UPDATE recipes SET Name = " + recipe.Name + ", Category = " + recipe.Category + ", Ingredients = " + recipe.Ingredients + ", Steps = " + recipe.Steps + ", Creator = " + recipe.Creator + ", PrepTime = " + recipe.PrepTime + ", CookTime = " + recipe.CookTime + ", servingsCount = " + recipe.servingsCount + ", isFavorite = " + recipe.isFavorite + " WHERE Id = " + recipe.Id;
            executeQuery(qry, conString);
        }

        public void deleteRecipe(Guid id, String conString)
        { 
            String qry = "DELETE FROM recipes WHERE Id = " + id;
            executeQuery(qry, conString);
        }

        public Recipe? getRecipe(Guid id, String conString)
        {
            String qry = "SELECT * FROM recipes WHERE Id = " + id;
            List<Recipe> results = executeQueryGetData(qry, conString);
            return results.FirstOrDefault();
        }

        public List<Recipe> GetRecipesByCategory(String category, String conString)
        {
            string query = "SELECT * FROM recipes WHERE Category = " + category;
            List<Recipe> recipes = executeQueryGetData(query, conString);
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
