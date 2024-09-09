export function getFilteredRecipes (recipes) {

    //TODO Ajouter algo de tri ici

    const filteredResponse = recipes
    return filteredResponse
}

export function getIngredientList (recipes) {
    let ingredientList = []
    // Store all ingredients of all recipes given
    recipes.forEach(recipe => {
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

export function getApplianceList (recipes) {
    let applianceList = []
    // Store all appliances of all recipes given
    recipes.forEach(recipe => {
        applianceList.push(recipe.appliance)
    });
    // Lowercase, remove and sort duplicate appliances
    applianceList = applianceList.map( (item) => item.toLowerCase())
    let sortedApplianceList = [...new Set(applianceList)]
    sortedApplianceList.sort()

    return sortedApplianceList
}

export function getUstensilList (recipes) {
    let ustensilList = []
    // Store all appliances of all recipes given
    recipes.forEach(recipe => {
        ustensilList.push(...recipe.ustensils)
    });
    // Lowercase, remove and sort duplicate appliances
    ustensilList = ustensilList.map( (item) => item.toLowerCase())
    let sortedUstensilList = [...new Set(ustensilList)]
    sortedUstensilList.sort()

    return sortedUstensilList
}

export function getNumberOfRecipesDisplayed (recipes) {
    return recipes.length
}