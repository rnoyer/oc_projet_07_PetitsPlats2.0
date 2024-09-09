function createListItem(item) {

    //get a unique random alphanumeric string for list elements
    const randomString = Math.random().toString(36).slice(2)

    const liElement = document.createElement('li')
    liElement.classList.add('flex', 'items-center', 'ps-2', 'pe-2', 'rounded', 'hover:bg-yellow-100', 'active:bg-yellow-600', 'has-[:checked]:bg-yellow-300')
    const labelElement = document.createElement('label')
    labelElement.classList.add('w-full', 'py-2', 'font-body', 'text-sm', 'text-black')
    labelElement.setAttribute('for',`checkbox-item-${randomString}`)
    labelElement.innerHTML = item
    const inputElement = document.createElement('input')
    inputElement.classList.add('min-w-4', 'h-4', 'appearance-none', 'rounded-full', 'bg-no-repeat', 'bg-center', 'checked:bg-black', 'checked:bg-cross-svg')
    inputElement.setAttribute('id',`checkbox-item-${randomString}`)
    inputElement.setAttribute('type','checkbox')
    inputElement.setAttribute('value',item)

    liElement.append(labelElement,inputElement)
    return liElement
}

function createEmptyListFallback() {
    const fallbackDiv = document.createElement('div')
    fallbackDiv.classList.add('px-3', 'pb-3', 'text-stone-400')
    fallbackDiv.innerHTML = 'Aucun élément à afficher.'

    return fallbackDiv
}

export function hydrateDropdownList(array, HTMLElementToHydrate) {
    if(array.length > 0) {
        array.forEach(element => {
            const listItem = createListItem(element)
            HTMLElementToHydrate.append(listItem)
        });
    }else {
        const fallbackMessage = createEmptyListFallback()
        HTMLElementToHydrate.append(fallbackMessage)
    }
}

export function displayNumberOfRecipes(numberOfRecipes) {
    const HTMLElementToHydrate = document.getElementById('number-of-recipes')
    const conjugaison = numberOfRecipes > 1 ? 'recettes' : 'recette'
    HTMLElementToHydrate.innerHTML = `${numberOfRecipes} ${conjugaison}`
}

export function updateDropdownList(array, HTMLElementToHydrate) {
    HTMLElementToHydrate.textContent=''
    hydrateDropdownList(array, HTMLElementToHydrate)
}

export function updateNumberOfRecipes(numberOfRecipes) {
    const HTMLElementToHydrate = document.getElementById('number-of-recipes')
    HTMLElementToHydrate.textContent=''
    displayNumberOfRecipes(numberOfRecipes)
}