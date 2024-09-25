import { updateWebPage } from "../03_controllers/index.js";
import { getFilteredRecipeArray } from "../01_models/recipes_model.js";
import { updateDropdownList } from "../02_views/filterbar-view.js"

// Search Bar
export let SearchBarInput = ''

export function SearchBarInputListener() {
    const mainSearchBar = document.getElementById('default-search')
    mainSearchBar.addEventListener('input', (e) => {
        let userInput = e.target.value
        // Search bar get more than 2 characters ? return input : else return empty string
        SearchBarInput = userInput.length > 2 ? userInput : ''
        updateWebPage()
    })
}

// Dropdown list Search Bars
export let ingredientsInput = ''
export let applianceInput = ''
export let ustensilInput = ''

export function dropdownSearchBarInputListener(inputId, input, formId, dropDownId, getFunction, checkedElements){
    const SearchBar = document.getElementById(inputId)
    const form = document.getElementById(formId)

    SearchBar.addEventListener('input', (e) => {
        const actualArray = getFilteredRecipeArray()
        const actualItemList = getFunction(actualArray)

        let userInput = e.target.value
        input = userInput.length > 2 ? userInput.toLowerCase() : ''
        
        if (input.length > 2 ) {
            let ListFiltered = actualItemList.filter(item => item.includes(input))
            return updateDropdownList(document.getElementById(dropDownId), ListFiltered, checkedElements)
        }
        updateDropdownList(document.getElementById(dropDownId), actualItemList, checkedElements)
    })

    form.addEventListener('reset', () => {
        const actualArray = getFilteredRecipeArray()
        const actualItemList = getFunction(actualArray)
        
        updateDropdownList(document.getElementById(dropDownId), actualItemList, checkedElements)
    })
}
