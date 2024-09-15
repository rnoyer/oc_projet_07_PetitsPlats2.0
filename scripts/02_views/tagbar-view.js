import { updateWebPage } from "../03_controllers/index.js"
import { updateTagList } from "../01_models/tags_model.js"
import { uncheckItemInList } from "./filterbar-view.js"

function createTagButton(tag, listID) {
    const buttonElement = document.createElement('button')
    buttonElement.setAttribute('type', 'button')
    buttonElement.setAttribute('class', 'tagButton text-black bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-600 font-body rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center justify-between gap-2')
    buttonElement.setAttribute('listID',listID)
    buttonElement.innerHTML = tag
    const svgCross = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgCross.setAttribute('width', '14')
    svgCross.setAttribute('height', '13')
    svgCross.setAttribute('viewBox', '0 0 14 13')
    svgCross.setAttribute('fill', 'none')
    svgCross.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    svgPath.setAttribute('d', 'M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5')
    svgPath.setAttribute('stroke', '#1B1B1B')
    svgPath.setAttribute('stroke-width', '2.16667')
    svgPath.setAttribute('stroke-linecap', 'round')
    svgPath.setAttribute('stroke-linejoin', 'round')

    svgCross.append(svgPath)
    svgCross.addEventListener('click', listenClickOnTag)
    buttonElement.append(svgCross)

    return buttonElement
}

export function displayTagButtons(listOfTags) {
    // uses listsOfCheckedElements
    const HTMLElementToHydrate = document.getElementById('filter-selection')
    // console.log('--------------')
    for(const list in listOfTags) {
        if(listOfTags[list].length > 0) {
            listOfTags[list].forEach(tag => {
                const tagButton = createTagButton(tag, list)
                HTMLElementToHydrate.append(tagButton)
            });
        }
        // console.log(`${list}: ${listOfTags[list]}`)
    }
}

export function updateTags(listOfTags) {
    const HTMLElementToHydrate = document.getElementById('filter-selection')
    HTMLElementToHydrate.replaceChildren()
    displayTagButtons(listOfTags)
}

function listenClickOnTag(e) {
    const tagName = e.target.nodeName === 'svg' ? e.target.parentNode.textContent : e.target.parentNode.parentNode.textContent
    const listID = e.target.nodeName === 'svg' ? e.target.parentNode.getAttribute('listid') : e.target.parentNode.parentNode.getAttribute('listid')
    uncheckItemInList(tagName, listID)
    updateTagList(tagName, listID)
    updateWebPage()
}
