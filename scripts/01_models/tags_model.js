export let listsOfCheckedElements = {
    Ingredient: [],
    Appliance: [],
    Ustensil: []
}

// Update tagList when a checkbox is checked/unchecked
export function updateTagList(tag, listID) {
    if(listsOfCheckedElements[listID].includes(tag)){
        listsOfCheckedElements[listID] = listsOfCheckedElements[listID].filter(item => item !== tag)
    }else{
        listsOfCheckedElements[listID].push(tag)
    }
}