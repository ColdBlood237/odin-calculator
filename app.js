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
    let result;
    if (operator === "+") {
        result = add(a, b);
    } else if (operator === "-") {
        result = subtract(a, b);
    } else if (operator === "*") {
        result = multiply(a, b);
    } else if (operator === "÷") {
        if (b === 0) {
            return "lmao";
        }
        result = divide(a, b);
    }
    let roundedResult = Math.round(result * 100) / 100;
    return roundedResult;
}

const display = document.getElementById("display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const point = document.getElementById("point");

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

when user press .
    if there's no "." on the display
        add .
   
*/

// "a" and "b" are the operands
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

        doFlashAnimation(e.target, "#e6e6e6");
        resetOperatorsButtonsColor();
    });
});

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

        darkenOperatorButton(e.target);
    });
});

equals.addEventListener("click", e => {
    b = display.textContent;
    cleanDisplay();
    populateDisplay(operate(operator, +a, +b));
    operatorSaved = false;
    secondOperandSaved = false;
    doFlashAnimation(e.target, "#9611a2");
    resetOperatorsButtonsColor();
});

clear.addEventListener("click", (e) => {
    a = null;
    b = null;
    operator = null;
    operatorSaved = false;
    waitingSecondOperand = false;
    secondOperandInputted = false;
    secondOperandSaved = false;
    firstInput = true;
    display.textContent = "0";
    doFlashAnimation(e.target, "#e6e6e6");
    resetOperatorsButtonsColor();
});

point.addEventListener("click", (e) => {
    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
    doFlashAnimation(e.target, "#e6e6e6");
})

function populateDisplay(keyPressed) {
    display.textContent += keyPressed;
}

function cleanDisplay() {
    display.textContent = "";
}

function doFlashAnimation(button, flashedColor) {
    let defaultColor = button.style.backgroundColor;
    button.style.backgroundColor = flashedColor;
    setTimeout(() => {
        button.style.backgroundColor = defaultColor;
    }, 100);
}

function darkenOperatorButton(button) {
    resetOperatorsButtonsColor()
    button.style.backgroundColor = "#7e4f74"
}

function resetOperatorsButtonsColor() {
    let defaultColor = "rgb(171, 121, 161)";
    operators.forEach(ope => {
        ope.style.backgroundColor = defaultColor;
    });
}