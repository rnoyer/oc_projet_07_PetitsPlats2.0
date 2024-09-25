import { recipes} from "../../data/recipes.js"
import { listsOfCheckedElements } from "./tags_model.js"
import { SearchBarInput } from "../04_plugins/forms.js"

export function getFilteredRecipeArray() {

    // searchbar filter
    let FilteredRecipes = recipes
    FilteredRecipes.forEach(recipe => {
        let stringToCheck = ''
        stringToCheck = stringToCheck.concat(recipe.name.toLowerCase(),' ',recipe.description.toLowerCase(),' ')
        recipe.ingredients.forEach(ingredient => {
            stringToCheck = stringToCheck.concat(ingredient.ingredient.toLowerCase(),' ')
        });
        if(!stringToCheck.includes(SearchBarInput.toLowerCase())){
            FilteredRecipes = FilteredRecipes.filter(item => item !== recipe)
        }
    });

    // ingredient filter
    if(listsOfCheckedElements.Ingredient.length){
        // Loop over each recipe
        FilteredRecipes.forEach(recipe => {
            // Build an array with all ingredients in the recipe
            let recipeIngredients = []
            recipe.ingredients.forEach(ingredient => {
                recipeIngredients.push(ingredient.ingredient.toLowerCase())
            });

            // Test intersection between ingredients in recipe and ingredients checked in dropdown list.
            // Return TRUE if intersection exist
            let testIntersection = recipeIngredients.filter(item => listsOfCheckedElements.Ingredient.includes(item)).length
            
            // Test wether ALL ingredients checked are in the recipe
            // Return TRUE if ALL ingredients checked are in the recipe
            const allItemsInRecipe = testIntersection === listsOfCheckedElements.Ingredient.length

            // Remove recipe from list if does not match criterias (allItemsInRecipe)
            if(!allItemsInRecipe){
                FilteredRecipes = FilteredRecipes.filter(item => item !== recipe)
            }
        });
    }

    // appliance filter
    if(listsOfCheckedElements.Appliance.length){
        // Loop over each recipe
        FilteredRecipes.forEach(recipe => {
            const testAppliance = listsOfCheckedElements.Appliance[0] === recipe.appliance.toLowerCase()
            if(!testAppliance){
                FilteredRecipes = FilteredRecipes.filter(item => item !== recipe)
            }
        });
    }

    // ustensil filter
    if(listsOfCheckedElements.Ustensil.length){
        // Loop over each recipe
        FilteredRecipes.forEach(recipe => {
            // Test intersection between ustensils in recipe and ustensils checked in dropdown list.
            // Return TRUE if intersection exist
            let testIntersection = recipe.ustensils.filter(item => listsOfCheckedElements.Ustensil.includes(item.toLowerCase())).length
            
            // Test wether ALL ustensils checked are in the recipe
            // Return TRUE if ALL ustensils checked are in the recipe
            const allItemsInRecipe = testIntersection === listsOfCheckedElements.Ustensil.length

            // Remove recipe from list if does not match criterias (allItemsInRecipe)
            if(!allItemsInRecipe){
                FilteredRecipes = FilteredRecipes.filter(item => item !== recipe)
            }
        });
    }

    return FilteredRecipes
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
