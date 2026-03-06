using CookbookProject.Server.Managers;
using CookbookProject.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Minimal API - register manager and keep Swagger support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<RecipeManager>();
// Configure CORS to allow the React dev server (adjust origins as needed)
var corsPolicyName = "AllowReactDevClient";

var conString = builder.Configuration["cookbook:conString"];

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicyName,
        policy =>
        {
            policy.WithOrigins("http://localhost:64061", "https://localhost:64061", "http://localhost:5173", "https://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS
app.UseCors(corsPolicyName);

//app.UseAuthorization();

// Minimal API endpoints for recipes
app.MapGet("/api/recipes/{id:guid}", (Guid id, RecipeManager mgr) =>
{
    var recipe = mgr.getRecipe(id, conString);
    return recipe is not null ? Results.Ok(recipe) : Results.NotFound();
});

app.MapGet("/api/recipes/category/{category}", (string category, RecipeManager mgr) =>
{
    var recipes = mgr.GetRecipesByCategory(category, conString);
    return Results.Ok(recipes);
});

app.MapGet("/api/recipes/all", (RecipeManager mgr) =>
{
    var recipes = mgr.GetAllRecipes(conString);
    return Results.Ok(recipes);
});

app.MapPost("/api/recipes", (Recipe recipe, RecipeManager mgr) =>
{
    mgr.createRecipe(recipe, conString);
    return Results.Created($"/api/recipes/{recipe.Id}", recipe);
});

app.MapPut("/api/recipes/{id:guid}", (Guid id, Recipe recipe, RecipeManager mgr) =>
{
    if (id != recipe.Id) return Results.BadRequest();
    mgr.updateRecipe(recipe, conString);
    return Results.NoContent();
});

app.MapDelete("/api/recipes/{id:guid}", (Guid id, RecipeManager mgr) =>
{
    mgr.deleteRecipe(id, conString);
    return Results.NoContent();
});

app.MapFallbackToFile("/index.html");

app.Run();
