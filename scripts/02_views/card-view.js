function createIngredient(ingredientData) {
    const { ingredient, quantity, unit } = ingredientData

    const ingredientDiv = document.createElement('div')
    const ingredientItem = document.createElement('dt')
    ingredientItem.classList.add('text-black')
    ingredientItem.innerHTML = ingredient
    const ingredientQuantity = document.createElement('dd')
    ingredientQuantity.classList.add('text-gray-500')
    if(quantity && unit) {
        ingredientQuantity.innerHTML = `${quantity} ${unit}`
    }else if(quantity && !unit){
        ingredientQuantity.innerHTML = `${quantity}`
    }else {
        ingredientQuantity.innerHTML = '-'
    }
    ingredientDiv.append(ingredientItem, ingredientQuantity)
    return ingredientDiv
}

function createCard(cardData) {
    const { image, name, time, description, ingredients } = cardData
    
    // Set HTML element : Global card container
    const cardContainer = document.createElement('div')
    cardContainer.classList.add('max-w-sm', 'bg-white', 'border', 'rounded-lg', 'drop-shadow-2xl')
    
    // Set HTML card's upper part
    const cardUpperPart = document.createElement('div')
    cardUpperPart.classList.add('rounded-t-lg', 'h-64', 'w-full', 'overflow-hidden', 'grid')
    const cardImage = document.createElement('img')
    cardImage.classList.add('object-cover', 'object-center', 'w-full', 'h-full', 'superimpose')
    cardImage.setAttribute('src', `../assets/recipes/${image}`)
    cardImage.setAttribute('alt','Plat')

    if(time){
        // create cooking time tag if time key exists 
        const cookTimeTag = document.createElement('div')
        cookTimeTag.classList.add('text-black', 'bg-yellow-300', 'font-body', 'text-base', 'text-center', 'h-fit', 'w-fit', 'superimpose', 'px-4', 'py-1', 'm-5', 'rounded-full', 'justify-self-end')
        const cookTimeContent = document.createElement('p')
        cookTimeContent.innerHTML = `${time}min`
        cookTimeTag.appendChild(cookTimeContent)
        // Append elements to upper part
        cardUpperPart.append(cardImage,cookTimeTag)
    } else {
        // Append elements to upper part
        cardUpperPart.append(cardImage)
    }

    // Set HTML card's lower part
    const cardLowerPart = document.createElement('div')
    cardLowerPart.classList.add('p-5','mb-14')
    const recipeTitle = document.createElement('h3')
    recipeTitle.classList.add('uppercase', 'font-title', 'text-xl', 'mt-3', 'mb-7')
    recipeTitle.innerHTML = name
    const recipeSubtitleRecette = document.createElement('h4')
    recipeSubtitleRecette.classList.add('font-body', 'uppercase', 'text-gray-500', 'text-xs', 'font-bold', 'tracking-widest', 'mb-4')
    recipeSubtitleRecette.innerHTML = 'Recette'
    const recetteContent = document.createElement('p')
    recetteContent.classList.add('font-body', 'text-sm', 'text-black')
    recetteContent.innerHTML = description
    const recipeSubtitleIngredients = document.createElement('h4')
    recipeSubtitleIngredients.classList.add('font-body', 'uppercase', 'text-gray-500', 'text-xs', 'font-bold', 'tracking-widest', 'mb-4', 'mt-7')
    recipeSubtitleIngredients.innerHTML = 'Ingrédients'
    const ingredientsContainer = document.createElement('dl')
    ingredientsContainer.classList.add('grid', 'grid-cols-2', 'gap-5', 'font-body', 'text-sm')
    // Append HTML elements to lower part
    cardLowerPart.append(recipeTitle, recipeSubtitleRecette, recetteContent, recipeSubtitleIngredients, ingredientsContainer)

    // Set HTML ingredients list in lower part
    //Loop through ingredients to build 'Ingrédients' part
    ingredients.forEach(item => {
        const ingredientHTMLElement = createIngredient(item)
        ingredientsContainer.appendChild(ingredientHTMLElement)
    });

    // Append upper and lower parts to card container
    cardContainer.append(cardUpperPart,cardLowerPart)

    return cardContainer
}

function createNoCardFallback(item = 'cela') {
    const fallbackDiv = document.createElement('div')
    fallbackDiv.classList.add('text-stone-400')
    fallbackDiv.innerHTML = `Aucune recette ne contient ${item}. Vous pouvez chercher «tarte aux pommes », « poisson », etc.`

    return fallbackDiv
}

let HTMLCardsContainer = document.getElementById('recipe-cards-container')

function displayRecipeCards(recipesArray) {
    // HTML element to populate
    HTMLCardsContainer = document.getElementById('recipe-cards-container')
    
    if(recipesArray.length > 0) {
        // Loop through each recipes and populate HTML element
        recipesArray.forEach(element => {
            const recipeCard = createCard(element)
            HTMLCardsContainer.appendChild(recipeCard)
        });
    }else {
        const fallbackMessage = createNoCardFallback()
        HTMLCardsContainer.append(fallbackMessage)
    }
}

export function updateRecipeCards(recipesArray) {
    HTMLCardsContainer.replaceChildren()
    displayRecipeCards(recipesArray)
}
