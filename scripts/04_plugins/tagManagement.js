import { updateHTMLTag } from "../02_views/tagbar-view.js";

export let allLists = {
    Ingredient: [],
    Appliance: [],
    Ustensil: []
}

export function tagListener() {
    //Listen to click on TAG buttons
    const buttonsToListen = document.querySelectorAll('.tagButton')

    buttonsToListen.forEach(element => {
        element.addEventListener('click', () => {
            const tag = element.textContent
            const listID = element.getAttribute('listID')
            uncheckBox(tag, listID)
            updateTagList(tag, listID)
        })
    });
}

export function checkboxListener() {
    // Listen to a change in checkbox and trigger taglist update
    const checkboxes = document.querySelectorAll('input[type=checkbox]')
    checkboxes.forEach(element => {
        element.addEventListener('click', () => {
            const listNameToUpdate = element.parentElement.parentElement.getAttribute('id')
            updateTagList(element.getAttribute('value'), listNameToUpdate)
        })     
    });
}

function updateTagList(tag, listID) {
    // Update tagList when a checkbox is checked/unchecked
    if(allLists[listID].includes(tag)){
        allLists[listID] = allLists[listID].filter(item => item !== tag)
    }else{
        allLists[listID].push(tag)
    }
    updateHTMLTag()
    tagListener()
}

function uncheckBox(tag, listID) {
    // Remove check 'tag' from checkbox in list 'listID'
    const allInputs = document.getElementById(listID).querySelectorAll('input')
    for(const input of allInputs) {
        if(input.getAttribute('value') === tag){
            input.checked = false;
        }
    }
}


// allLists[listToUpdate]