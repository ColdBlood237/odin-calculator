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
    } else if (operator === "×") {
        return multiply(a, b);
    } else if (operator === "÷") {
        return divide(a, b);
    }
}

function turnStringToResult(string) {
    let a = "";
    let b = "";
    let operator = "";
    for (const i in string) {
        let ch = string[i];
        if (operator === "" && !isNaN(ch)) {
            a += ch;
        } else if (isNaN(ch) && ch !== "=") {
            operator = ch;
        } else if (operator !== "" && !isNaN(ch)) {
            b += ch;
        }
    }

    return operate(operator, +a, +b);
}

const display = document.getElementById("display");
const keyboard = document.getElementById("keyboard");
const digits = document.querySelectorAll(".digit");

/*

user type numbers while we display them
when user click an operator save the previous number in operand a
user type numbers while we display them
when user click equals save the previous number in operand b
call the operate function
display the result

*/


keyboard.addEventListener("click", (e) => {
    let btnClicked = e.target;
    display.textContent += btnClicked.textContent;

    if (btnClicked.textContent === "=") {
        display.textContent = turnStringToResult(display.textContent);
    }
})