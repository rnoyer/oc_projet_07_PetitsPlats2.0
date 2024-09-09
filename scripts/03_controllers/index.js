//import initial recipes database
import { recipes, oneRecipe, noRecipe } from "../../data/recipes.js"
// import models
import { getFilteredRecipes, getIngredientList,getApplianceList, getUstensilList, getNumberOfRecipesDisplayed } from "../01_models/recipes_model.js"
// import views
import { hydrateDropdownList, displayNumberOfRecipes } from "../02_views/filterbar-view.js"
import { displayRecipeCards } from "../02_views/card-view.js"
// import plugins
import { dropdownListener } from "../04_plugins/buttonDropdown.js"
import { checkboxListener } from "../04_plugins/tagManagement.js"



async function init() {

    // Toutes les recettes
    const allRecipes = oneRecipe
    
    // Affiche les recettes
    displayRecipeCards(allRecipes)

    // Récupération des éléments à hydrater
    const ingredientHTMLListElement = document.getElementById('Ingredient')
    const applianceHTMLListElement = document.getElementById('Appliance')
    const ustensilHTMLListElement = document.getElementById('Ustensil')
    // Récupération des données des listes
    const ingredientList = getIngredientList(allRecipes)
    const applianceList = getApplianceList(allRecipes)
    const ustensilList = getUstensilList(allRecipes)
    // Hydratation des listes
    hydrateDropdownList(ingredientList, ingredientHTMLListElement)
    hydrateDropdownList(applianceList, applianceHTMLListElement)
    hydrateDropdownList(ustensilList, ustensilHTMLListElement)
    // Récupère et affiche le nombre de recettes affichées
    const numberOfRecipes = getNumberOfRecipesDisplayed(allRecipes)
    displayNumberOfRecipes(numberOfRecipes)

    // Activate event listeners
    dropdownListener()
    checkboxListener()
}

init()