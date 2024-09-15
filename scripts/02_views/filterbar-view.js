import { updateTagList } from "../01_models/tags_model.js"
import { updateWebPage } from "../03_controllers/index.js"

// Create one HTML item element 
function createListItem(item, checked = false) {

    //get a unique random alphanumeric string for list elements
    const randomString = Math.random().toString(36).slice(2)

    const liElement = document.createElement('li')
    liElement.classList.add('flex', 'items-center', 'ps-2', 'pe-2', 'rounded', 'hover:bg-yellow-100', 'active:bg-yellow-600', 'has-[:checked]:bg-yellow-300')
    const labelElement = document.createElement('label')
    labelElement.classList.add('w-full', 'py-2', 'font-body', 'text-sm', 'text-black')
    labelElement.setAttribute('for', `checkbox-item-${randomString}`)
    labelElement.innerHTML = item
    const inputElement = document.createElement('input')
    inputElement.classList.add('min-w-4', 'h-4', 'appearance-none', 'rounded-full', 'bg-no-repeat', 'bg-center', 'checked:bg-black', 'checked:bg-cross-svg')
    inputElement.setAttribute('id', `checkbox-item-${randomString}`)
    if (checked) {
        inputElement.setAttribute('checked', '')
    }
    inputElement.setAttribute('type', 'checkbox')
    inputElement.setAttribute('value', item)
    inputElement.addEventListener('click', listenToCheckboxChanges)

    liElement.append(labelElement, inputElement)
    return liElement
}
// Create HTML element when 0 element found in a given List
function createEmptyListFallback() {
    const fallbackDiv = document.createElement('div')
    fallbackDiv.classList.add('px-3', 'pb-3', 'text-stone-400')
    fallbackDiv.innerHTML = 'Aucun élément à afficher.'

    return fallbackDiv
}

// Create whole HTML list of items
function DisplayListinDropdown(HTMLElementToHydrate, itemsList, checkedItemsList) {
    if (itemsList.length > 0) {
        itemsList.forEach(item => {
            const listItem = checkedItemsList.includes(item) ? createListItem(item, true) : createListItem(item, false)
            HTMLElementToHydrate.append(listItem)
        });
    } else {
        const fallbackMessage = createEmptyListFallback()
        HTMLElementToHydrate.append(fallbackMessage)
    }
}

// Create HTML element to display Number of recipes
function displayNumberOfRecipes(numberOfRecipes) {
    const HTMLElementToHydrate = document.getElementById('number-of-recipes')
    const conjugaison = numberOfRecipes > 1 ? 'recettes' : 'recette'
    HTMLElementToHydrate.innerHTML = `${numberOfRecipes} ${conjugaison}`
}

export function updateDropdownList(HTMLElementToHydrate, itemsList, checkedItemsList) {
    HTMLElementToHydrate.replaceChildren()
    DisplayListinDropdown(HTMLElementToHydrate, itemsList, checkedItemsList)
}

export function updateNumberOfRecipes(recipesArray) {
    const HTMLElementToHydrate = document.getElementById('number-of-recipes')
    const numberOfRecipes = recipesArray.length
    HTMLElementToHydrate.replaceChildren()
    displayNumberOfRecipes(numberOfRecipes)
}

// Uncheck item in list 'listID'
export function uncheckItemInList(item, listID) {
    const allInputs = document.getElementById(listID).querySelectorAll('input')
    for(const input of allInputs) {
        if(input.getAttribute('value') === item){
            input.checked = false;
        }
    }
}

// Event Listener Function
export function listenToCheckboxChanges(event) {
    const tagName = event.target.value
    const listID = event.target.parentNode.parentNode.id
    event.stopPropagation();
    updateTagList(tagName, listID)
    updateWebPage()
}