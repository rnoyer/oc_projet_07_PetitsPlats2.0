//import initial recipes database
import { recipes, oneRecipe, fewRecipes, noRecipe } from "../../data/recipes.js"
// import models
import { getFilteredRecipeArray, getIngredientList,getApplianceList, getUstensilList } from "../01_models/recipes_model.js"
// import views
import { updateRecipeCards } from "../02_views/card-view.js"
import { updateTags } from "../02_views/tagbar-view.js";
import { updateNumberOfRecipes, updateDropdownList } from "../02_views/filterbar-view.js"

// import plugins
import { dropdownListener } from "../04_plugins/buttonDropdown.js"
import { listsOfCheckedElements } from "../01_models/tags_model.js";
import { inputListener } from "../04_plugins/forms.js"

// Toutes les recettes
export const allRecipes = fewRecipes

export function updateWebPage(newArray) {
    const recipeArray = newArray ? newArray : getFilteredRecipeArray()
    const ingredientList = getIngredientList(recipeArray)
    const applianceList = getApplianceList(recipeArray)
    const ustensilList = getUstensilList(recipeArray)

    // Update l'affichage des recettes
    updateRecipeCards(recipeArray)

    // Update des listes dropdown
    updateDropdownList(document.getElementById('Ingredient'), ingredientList, listsOfCheckedElements.Ingredient)
    updateDropdownList(document.getElementById('Appliance'), applianceList, listsOfCheckedElements.Appliance)
    updateDropdownList(document.getElementById('Ustensil'), ustensilList, listsOfCheckedElements.Ustensil)

    // Update le nombre de recettes affichées
    updateNumberOfRecipes(recipeArray)

    // Update des tags
    updateTags(listsOfCheckedElements)
}

async function init() {
    const recipeArray = allRecipes

    updateWebPage(recipeArray)

    // Activate event listeners
    dropdownListener()
    inputListener()
}

init()