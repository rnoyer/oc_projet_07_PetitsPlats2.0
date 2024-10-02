import { recipes} from "../../data/recipes.js"
import { listsOfCheckedElements } from "./tags_model.js"
import { SearchBarInput } from "../04_plugins/forms.js"

export function getFilteredRecipeArray() {

    // searchbar filter
    let FilteredRecipes = recipes
    // Loop over each recipe
    for (const recipe of FilteredRecipes) {
        let stringToCheck = ''
        stringToCheck = stringToCheck.concat(recipe.name.toLowerCase(),' ',recipe.description.toLowerCase(),' ')

        for (let j = 0; j < recipe.ingredients.length; j++) {
            const ingredient = recipe.ingredients[j];
            stringToCheck = stringToCheck.concat(ingredient.ingredient.toLowerCase(),' ')
        }
        if(!stringToCheck.includes(SearchBarInput.toLowerCase())){
            let newFilteredRecipes = [];
            for (let i = 0; i < FilteredRecipes.length; i++) {
                if(FilteredRecipes[i] !== recipe) {
                    newFilteredRecipes.push(FilteredRecipes[i])
                }
            }
            FilteredRecipes = newFilteredRecipes;
        }
    }

    // ingredient filter
    if(listsOfCheckedElements.Ingredient.length){
        // Loop over each recipe
        for (const recipe of FilteredRecipes) {
            let recipeIngredients = [];
            for (let i = 0; i < recipe.ingredients.length; i++) {
                const ingredient = recipe.ingredients[i];
                recipeIngredients.push(ingredient.ingredient.toLowerCase())
            }
            let intersectionArray = [];
            for(let j = 0; j < recipeIngredients.length; j++) {
                if(listsOfCheckedElements.Ingredient.includes(recipeIngredients[j].toLowerCase())){
                    intersectionArray.push(recipeIngredients[j])
                }
            }
            let testIntersection = intersectionArray.length;
            const allItemsInRecipe = testIntersection === listsOfCheckedElements.Ingredient.length
            if(!allItemsInRecipe){
                let newFilteredRecipes = [];
                for (let i = 0; i < FilteredRecipes.length; i++) {
                    if(FilteredRecipes[i] !== recipe) {
                        newFilteredRecipes.push(FilteredRecipes[i])
                    }
                }
                FilteredRecipes = newFilteredRecipes;
            }
        }
    }

    // appliance filter
    if(listsOfCheckedElements.Appliance.length){
        // Loop over each recipe
        for (const recipe of FilteredRecipes) {
            const testAppliance = listsOfCheckedElements.Appliance[0] === recipe.appliance.toLowerCase()
            if(!testAppliance){
                let newFilteredRecipes = [];
                for (let i = 0; i < FilteredRecipes.length; i++) {
                    if(FilteredRecipes[i] !== recipe) {
                        newFilteredRecipes.push(FilteredRecipes[i])
                    }
                }
                FilteredRecipes = newFilteredRecipes;
            }
        }
    }

    // ustensil filter
    if(listsOfCheckedElements.Ustensil.length){
        // Loop over each recipe
        for (const recipe of FilteredRecipes) {
            let intersectionArray = [];
            for(let j = 0; j < recipe.ustensils.length; j++) {
                if(listsOfCheckedElements.Ustensil.includes(recipe.ustensils[j].toLowerCase())){
                    intersectionArray.push(recipe.ustensils[j])
                }
            }
            let testIntersection = intersectionArray.length;
            const allItemsInRecipe = testIntersection === listsOfCheckedElements.Ustensil.length
            if(!allItemsInRecipe){
                let newFilteredRecipes = [];
                for (let i = 0; i < FilteredRecipes.length; i++) {
                    if(FilteredRecipes[i] !== recipe) {
                        newFilteredRecipes.push(FilteredRecipes[i])
                    }
                }
                FilteredRecipes = newFilteredRecipes;
            }
        }
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
