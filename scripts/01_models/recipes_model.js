import { recipes} from "../../data/recipes.js"
import { listsOfCheckedElements } from "./tags_model.js"
import { SearchBarInput } from "../04_plugins/forms.js"

export function getFilteredRecipeArray() {

    // searchbar filter
    let FilteredRecipes = recipes
    let temporaryRecipeList = []

    if(SearchBarInput) {
        // Loop over each recipe
        for (let i = 0; i < FilteredRecipes.length; i++) {
            const recipe = FilteredRecipes[i]

            // Concatenate all strings to one for evaluation
            let stringToCheck = ''
            stringToCheck = stringToCheck.concat(recipe.name.toLowerCase(),' ',recipe.description.toLowerCase(),' ')
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j];
                stringToCheck = stringToCheck.concat(ingredient.ingredient.toLowerCase(),' ')
            }
            if(stringToCheck.includes(SearchBarInput.toLowerCase())){
                temporaryRecipeList.push(FilteredRecipes[i])
            }

        }
        FilteredRecipes = temporaryRecipeList
        temporaryRecipeList = []
    }

    // ingredient filter
    if(listsOfCheckedElements.Ingredient.length){
        // Loop over each recipe
        for (let i = 0; i < FilteredRecipes.length; i++){
            const recipe = FilteredRecipes[i]

            // Fetch ingredients
            let recipeIngredients = [];
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j];
                recipeIngredients.push(ingredient.ingredient.toLowerCase())
            }

            // Fetch ingredient intersection : recipe <> checked ingredients
            let intersectionArray = [];
            for(let k = 0; k < recipeIngredients.length; k++) {
                if(listsOfCheckedElements.Ingredient.includes(recipeIngredients[k].toLowerCase())){
                    intersectionArray.push(recipeIngredients[k])
                }
            }

            // Get to know if all items checked are in the recipe ingredients
            let testIntersection = intersectionArray.length;
            const allItemsInRecipe = testIntersection === listsOfCheckedElements.Ingredient.length

            // Add recipe to filtered list if YES (allItemsInRecipe === true)
            if(allItemsInRecipe){
                temporaryRecipeList.push(FilteredRecipes[i])
            }

        }
        FilteredRecipes = temporaryRecipeList
        temporaryRecipeList = []
    }

    // appliance filter
    if(listsOfCheckedElements.Appliance.length){
        // Loop over each recipe
        for (let i = 0; i < FilteredRecipes.length; i++){
            const recipe = FilteredRecipes[i]

            // Get to know if appliance checked is in the recipe appliance
            const testAppliance = listsOfCheckedElements.Appliance[0] === recipe.appliance.toLowerCase()
            if(testAppliance){
                temporaryRecipeList.push(FilteredRecipes[i])
            }
        }
        FilteredRecipes = temporaryRecipeList
        temporaryRecipeList = []
    }

    // ustensil filter
    if(listsOfCheckedElements.Ustensil.length){
        // Loop over each recipe
        for (let i = 0; i < FilteredRecipes.length; i++){
            const recipe = FilteredRecipes[i]

            // Fetch ustensil intersection : recipe <> checked ustensils
            let intersectionArray = [];
            for(let j = 0; j < recipe.ustensils.length; j++) {
                if(listsOfCheckedElements.Ustensil.includes(recipe.ustensils[j].toLowerCase())){
                    intersectionArray.push(recipe.ustensils[j])
                }
            }

            // Get to know if all items checked are in the recipe ustensils
            let testIntersection = intersectionArray.length;
            const allItemsInRecipe = testIntersection === listsOfCheckedElements.Ustensil.length

            // Add recipe to filtered list if YES (allItemsInRecipe === true)
            if(allItemsInRecipe){
                temporaryRecipeList.push(FilteredRecipes[i])
            }
        }
        FilteredRecipes = temporaryRecipeList
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
