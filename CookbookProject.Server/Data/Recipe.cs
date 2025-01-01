namespace CookbookProject.Server.Data
{
    public class Recipe
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Ingredients { get; set; }
        public string Steps { get; set; }
        public string Creator { get; set; }
        public string PrepTime {  get; set; }
        public string CookTime {  get; set; }
        public Nullable<int> servingsCount {  get; set; }

        public Recipe() {
            this.Id = Guid.NewGuid();
            this.Name = "";
            this.Category = "";
            this.Ingredients = "";
            this.Steps = "";
            this.Creator = "";
            this.PrepTime = "";
            this.CookTime = "";
        }
        public Recipe(string name, string category, string ingredients, string steps, string creator, string prepTime, string cookTime)
        {
            this.Id = Guid.NewGuid();
            this.Name = name;
            this.Category = category;
            this.Ingredients = ingredients;
            this.Steps = steps;
            this.Creator = creator;
            this.PrepTime = prepTime;
            this.CookTime = cookTime;
            this.servingsCount = null;
        }

        public Recipe(string name, string category, string ingredients, string steps, string creator, string prepTime, string cookTime, int servings)
        {
            this.Id = Guid.NewGuid();
            this.Name = name;
            this.Category = category;
            this.Ingredients = ingredients;
            this.Steps = steps;
            this.Creator = creator;
            this.PrepTime = prepTime;
            this.CookTime = cookTime;
            this.servingsCount = servings;
        }
    }
}
