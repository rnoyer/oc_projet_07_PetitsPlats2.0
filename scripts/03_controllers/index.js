// import models
import { getFilteredRecipeArray, getIngredientList,getApplianceList, getUstensilList } from "../01_models/recipes_model.js"
// import views
import { updateRecipeCards } from "../02_views/card-view.js"
import { updateTags } from "../02_views/tagbar-view.js";
import { updateNumberOfRecipes, updateDropdownList } from "../02_views/filterbar-view.js"

// import plugins
import { dropdownListener } from "../04_plugins/buttonDropdown.js"
import { listsOfCheckedElements } from "../01_models/tags_model.js";
import { 
    SearchBarInputListener, 
    dropdownSearchBarInputListener, 
    ingredientsInput, 
    ustensilInput, 
    applianceInput 
} from "../04_plugins/forms.js"

export function updateWebPage(newArray) {
    const recipeArray = newArray ? newArray : getFilteredRecipeArray()

    // Update l'affichage des recettes
    updateRecipeCards(recipeArray)

    // Update des listes dropdown
    const ingredientList = getIngredientList(recipeArray)
    updateDropdownList(document.getElementById('Ingredient'), ingredientList, listsOfCheckedElements.Ingredient)

    const applianceList = getApplianceList(recipeArray)
    updateDropdownList(document.getElementById('Appliance'), applianceList, listsOfCheckedElements.Appliance)

    const ustensilList = getUstensilList(recipeArray)
    updateDropdownList(document.getElementById('Ustensil'), ustensilList, listsOfCheckedElements.Ustensil)

    // Update le nombre de recettes affichées
    updateNumberOfRecipes(recipeArray)

    // Update des tags
    updateTags(listsOfCheckedElements)
}

async function init() {
    // Load page
    updateWebPage()

    // Activate event listeners
    dropdownListener()
    SearchBarInputListener()
    dropdownSearchBarInputListener('ingredients-search', ingredientsInput, 'searchbar-ingredients', 'Ingredient', getIngredientList, listsOfCheckedElements.Ingredient)
    dropdownSearchBarInputListener('appareils-search',applianceInput, 'searchbar-appareils', 'Appliance', getApplianceList, listsOfCheckedElements.Appliance)
    dropdownSearchBarInputListener('ustensiles-search',ustensilInput, 'searchbar-ustensiles', 'Ustensil', getUstensilList, listsOfCheckedElements.Ustensil)
}

init()