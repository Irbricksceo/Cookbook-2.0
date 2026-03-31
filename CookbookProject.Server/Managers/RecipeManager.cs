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
            // Use parameterized query to avoid SQL injection
            string qry = "INSERT INTO recipes(Id, Name, Category, Ingredients, Steps, Creator, PrepTime, CookTime, servingsCount, isFavorite) " +
                         "VALUES (@Id, @Name, @Category, @Ingredients, @Steps, @Creator, @PrepTime, @CookTime, @servingsCount, @isFavorite);";

            var parameters = new Dictionary<string, object?>
            {
                { "@Id", recipe.Id },
                { "@Name", recipe.Name },
                { "@Category", recipe.Category },
                { "@Ingredients", recipe.Ingredients },
                { "@Steps", recipe.Steps },
                { "@Creator", recipe.Creator },
                { "@PrepTime", recipe.PrepTime },
                { "@CookTime", recipe.CookTime },
                { "@servingsCount", (object?)recipe.servingsCount ?? DBNull.Value },
                { "@isFavorite", recipe.isFavorite }
            };

            executeQuery(qry, conString, parameters);
        }

        public void updateRecipe(Recipe recipe, String conString)
        { 
            string qry = "UPDATE recipes SET Name = @Name, Category = @Category, Ingredients = @Ingredients, Steps = @Steps, " +
                         "Creator = @Creator, PrepTime = @PrepTime, CookTime = @CookTime, servingsCount = @servingsCount, isFavorite = @isFavorite " +
                         "WHERE Id = @Id;";

            var parameters = new Dictionary<string, object?>
            {
                { "@Id", recipe.Id },
                { "@Name", recipe.Name },
                { "@Category", recipe.Category },
                { "@Ingredients", recipe.Ingredients },
                { "@Steps", recipe.Steps },
                { "@Creator", recipe.Creator },
                { "@PrepTime", recipe.PrepTime },
                { "@CookTime", recipe.CookTime },
                { "@servingsCount", (object?)recipe.servingsCount ?? DBNull.Value },
                { "@isFavorite", recipe.isFavorite }
            };

            executeQuery(qry, conString, parameters);
        }

        public void deleteRecipe(Guid id, String conString)
        { 
            string qry = "DELETE FROM recipes WHERE Id = @Id;";
            var parameters = new Dictionary<string, object?> { { "@Id", id } };
            executeQuery(qry, conString, parameters);
        }

        public Recipe? getRecipe(Guid id, String conString)
        {
            string qry = "SELECT * FROM recipes WHERE Id = @Id;";
            var parameters = new Dictionary<string, object?> { { "@Id", id } };
            List<Recipe> results = executeQueryGetData(qry, conString, parameters);
            return results.FirstOrDefault();
        }

        public List<Recipe> GetRecipesByCategory(String category, String conString)
        {
            string query = "SELECT * FROM recipes WHERE Category = @Category;";
            var parameters = new Dictionary<string, object?> { { "@Category", category } };
            List<Recipe> recipes = executeQueryGetData(query, conString, parameters);
            return recipes;
        }

        public List<Recipe> GetAllRecipes(String conString)
        {
            string query = "SELECT * FROM recipes;";
            List<Recipe> recipes = executeQueryGetData(query, conString, null);
            return recipes;
        }
        
        public void executeQuery(string query, String conString, Dictionary<string, object?>? parameters = null)
        {
            using var con = new MySqlConnection(conString);
            con.Open();
            using var cmd = new MySqlCommand(query, con);

            if (parameters != null)
            {
                foreach (var kvp in parameters)
                {
                    cmd.Parameters.AddWithValue(kvp.Key, kvp.Value ?? DBNull.Value);
                }
            }

            cmd.ExecuteNonQuery();
        }
        public List<Recipe> executeQueryGetData(string query, String conString, Dictionary<string, object?>? parameters = null)
        {
            List<Recipe> recipes = new List<Recipe>();
            using var con = new MySqlConnection(conString);
            con.Open();
            using var cmd = new MySqlCommand(query, con);

            if (parameters != null)
            {
                foreach (var kvp in parameters)
                {
                    cmd.Parameters.AddWithValue(kvp.Key, kvp.Value ?? DBNull.Value);
                }
            }

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
                        // servingsCount may be nullable in DB
                        servingsCount = reader.IsDBNull(reader.GetOrdinal("servingsCount")) ? null : reader.GetInt32("servingsCount"),
                        isFavorite = reader.GetBoolean("isFavorite")
                    };
                    recipes.Add(recipe);
                }
            }

            return recipes;
        }
    }
}
