export function dropdownListener() {
    const buttonsToListen = document.querySelectorAll('.dropdownButton')
    let clickedList = ''

    //Listen to click on filterbar's dropdown buttons
    buttonsToListen.forEach(element => {
        element.addEventListener('click', () => {
            closeOtherDropdwns(buttonsToListen, element)
            toggleDropdwn(element)
            clickedList = element.getAttribute('id')
        }) 
    });

    // Closes dropdown list when click outside of it
    window.onclick = e => {
        // Does the clicked element has the same ID as the element triggering the EventListener above?  
        let isSameButton = e.target.getAttribute('id') === clickedList
        // Is it a click in a dropdown List?
        let isdropdownList = e.target.closest('.dropdownList')
        if(!isSameButton && !isdropdownList) {
            closeOtherDropdwns(buttonsToListen)
            clickedList = ''
        }
    } 
}

function toggleDropdwn(element) {
    element.classList.toggle('rounded-lg')
    element.classList.toggle('rounded-t-lg')
    element.nextElementSibling.classList.toggle('hidden')
}

function closeOtherDropdwns(dropdowns, avoidedElement = '') {
    dropdowns.forEach(element => {
        if (element !== avoidedElement){
            element.classList.remove('rounded-t-lg')
            element.classList.add('rounded-lg')
            element.nextElementSibling.classList.add('hidden')
        }
    });
}