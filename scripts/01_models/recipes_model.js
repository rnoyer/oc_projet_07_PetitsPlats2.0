import { recipes, oneRecipe, fewRecipes, noRecipe } from "../../data/recipes.js"

export function getFilteredRecipeArray() {

    //TO DO : Si Pas de tag + < 2 char, display 'allRecipes'
    let filteredResponse = oneRecipe

    //TO DO : algo de tri utilisant en input 'allRecipes'

    return filteredResponse
}

export function getIngredientList(recipesArray) {
    let ingredientList = []
    // Store all ingredients of all recipes given
    recipesArray.forEach(recipe => {
        recipe.ingredients.forEach(item => {
            ingredientList.push(item.ingredient)
        });
    });
    // Lowercase, remove and sort duplicate ingredients
    ingredientList = ingredientList.map( (item) => item.toLowerCase())
    let sortedIngredientList = [...new Set(ingredientList)]
    sortedIngredientList.sort()

    return sortedIngredientList
}

export function getApplianceList(recipesArray) {
    let applianceList = []
    // Store all appliances of all recipes given
    recipesArray.forEach(recipe => {
        applianceList.push(recipe.appliance)
    });
    // Lowercase, remove and sort duplicate appliances
    applianceList = applianceList.map( (item) => item.toLowerCase())
    let sortedApplianceList = [...new Set(applianceList)]
    sortedApplianceList.sort()

    return sortedApplianceList
}

export function getUstensilList(recipesArray) {
    let ustensilList = []
    // Store all appliances of all recipes given
    recipesArray.forEach(recipe => {
        ustensilList.push(...recipe.ustensils)
    });
    // Lowercase, remove and sort duplicate appliances
    ustensilList = ustensilList.map( (item) => item.toLowerCase())
    let sortedUstensilList = [...new Set(ustensilList)]
    sortedUstensilList.sort()

    return sortedUstensilList
}
