function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    }
}

const display = document.getElementById("display");
console.log(display);
const keyboard = document.getElementById("keyboard");
console.log(keyboard);
const digits = document.querySelectorAll(".digit");
console.log(digits);

keyboard.addEventListener("click", (e) => {
    let btnClicked = e.target.textContent;
    let displayValue = 0;
    if (!isNaN(btnClicked)) {
        display.textContent += btnClicked;
        displayValue = display.textContent;
        console.log(displayValue);
    }
})