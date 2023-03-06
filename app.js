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
    if (b == 0) {
        alert("Math error: division by zero")
        return "Math error"
    }
    return a / b;
}

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "÷") {
        return divide(a, b);
    }
}

const display = document.getElementById("display");
const keyboard = document.getElementById("keyboard");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equals = document.getElementById("equals");
const cancel = document.getElementById("cancel");

/*
when digit pressed
    if flag waiting second operand or first input is true
        clean display 
        reset both flags
        flag second operand inputted = true
    populate display

when operator pressed
    if flag second operand inputted is true
        store display value in variable "b"
        clean display
        call operate function and populate display 
    store display value in a variable "a"
    store the operator in a variable
    flag 1st operand saved
    flag operator saved = true
    flag waiting second operand = true

when user press = 
    store value on display in variable "b"
    clean display
    call the operate function
    populate the display with the returned value 
    reset flag operator saved
    reset flag second operand saved
   
*/

// "a" and "b" are the operands
let displayValue = null;
let a = null;
let b = null;
let operator = null;
let operatorSaved = false;
let waitingSecondOperand = false;
let secondOperandInputted = false;
let secondOperandSaved = false;
let firstInput = true;

digits.forEach(digit => {
    digit.addEventListener("click", (e) => {
        if (firstInput) {
            cleanDisplay();
            firstInput = false;
        }
        else if (waitingSecondOperand) {
            cleanDisplay();
            waitingSecondOperand = false;
        }
        if (operatorSaved) {
            secondOperandInputted = true;
        }
        populateDisplay(e.target.textContent);
    })
})

operators.forEach(ope => {
    ope.addEventListener("click", e => {
        if (secondOperandInputted) {
            b = display.textContent;
            cleanDisplay();
            populateDisplay(operate(operator, +a, +b));
        }

        a = display.textContent;
        operator = e.target.textContent;
        operatorSaved = true;
        waitingSecondOperand = true;

    })
})

equals.addEventListener("click", e => {
    b = display.textContent;
    cleanDisplay();
    populateDisplay(operate(operator, +a, +b));
    operatorSaved = false;
    secondOperandSaved = false;
})

function populateDisplay(keyPressed) {
    display.textContent += keyPressed;
}

function cleanDisplay() {
    display.textContent = "";
}