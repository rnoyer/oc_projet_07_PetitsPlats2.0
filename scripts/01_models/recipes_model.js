import { recipes, oneRecipe, fewRecipes, noRecipe } from "../../data/recipes.js"
import { listsOfCheckedElements } from "./tags_model.js"
import { userInputToProcess } from "../04_plugins/forms.js"

export function getFilteredRecipeArray() {
    let filteredResponse = []

    //Si Pas de tag + < 2 char, display 'allRecipes'
    if(!userInputToProcess && !listsOfCheckedElements.Ingredient.length && !listsOfCheckedElements.Appliance.length &&!listsOfCheckedElements.Ustensil.length){
        return recipes
    }

    //TO DO : algo de tri utilisant en input 'allRecipes'
    // searchbar filter
    let searchbarFilteredRecipes = []
    recipes.forEach(recipe => {
        let stringToCheck = ''
        stringToCheck = stringToCheck.concat(recipe.name,' ',recipe.description,' ')
        recipe.ingredients.forEach(ingredient => {
            stringToCheck = stringToCheck.concat(ingredient.ingredient,' ')
        });
        if(stringToCheck.toLowerCase().includes(userInputToProcess)){
            searchbarFilteredRecipes.push(recipe)
        }
    });

    // ingredient filter
    let ingredientFilteredRecipes = []
    if(listsOfCheckedElements.Ingredient.length){
        searchbarFilteredRecipes.forEach(recipe => {
            let recipeIngredientList=[]
            recipe.ingredients.forEach(item => {
                recipeIngredientList.push(item.ingredient)
            });
            // TO DO : traverser tous les ingredients de la liste et trouver si intersection avec les tags 'ingredient'
        });
    }else{
        ingredientFilteredRecipes = searchbarFilteredRecipes
    }

    // appliance filter

    // ustensil filter


    // return ingredientFilteredRecipes
    return searchbarFilteredRecipes
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
