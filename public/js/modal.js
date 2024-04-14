// Declarations
let modals = document.getElementsByClassName("Modal");
let buttons = document.getElementsByClassName("ModalTrigger");
let spans = document.getElementsByClassName("ModalClose");

// Function to handle opening a modal
function openModal(index) {
    modals[index].style.display = "block";
}

// Function to handle closing a modal
function closeModal(index) {
    modals[index].style.display = "none";
}

// Assign click event listeners to buttons to open corresponding modals
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function(e) {
        e.preventDefault();
        openModal(i);
    };
}

// Assign click event listeners to spans to close corresponding modals
for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = function(e) {
        e.preventDefault();
        closeModal(i);
    };
}

// Function to handle clicking on the dark background to close modals
window.onclick = function(event) {
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            closeModal(i);
        }
    }
};