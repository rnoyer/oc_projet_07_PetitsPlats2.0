import { updateWebPage } from "../03_controllers/index.js";

// Les recettes filtrées
export let userInputToProcess = ''

export function inputListener() {
    const mainSearchBar = document.getElementById('default-search')
    mainSearchBar.addEventListener('input', (e) => {
        let userInput = e.target.value
        // Search bar get more than 2 characters ? return input : else return empty string
        userInputToProcess = userInput.length > 2 ? userInput : ''
        updateWebPage()
    })
}
