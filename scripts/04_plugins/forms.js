import { updateWebPage } from "../03_controllers/index.js";

// Les recettes filtrées
export let processedRecipeList = []
export let userInputToProcess = ''

export function inputListener() {
    const mainSearchBar = document.getElementById('default-search')
    mainSearchBar.addEventListener('input', (e) => {
        let userInput = e.target.value
        // If search bar get more than 2 characters : Process recipe list at each keystroke in the input
        if(userInput.length > 2){
            userInputToProcess = userInput
            updateWebPage()
        }
    })
}
