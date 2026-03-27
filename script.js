// script.js

let display = '';

function appendNumber(num) {
    display += num;
    updateDisplay();
}

function appendOperator(operator) {
    display += operator;
    updateDisplay();
}

function calculate() {
    try {
        display = eval(display).toString();
    } catch (e) {
        display = 'Error';
    }
    updateDisplay();
}

function clearDisplay() {
    display = '';
    updateDisplay();
}

function updateDisplay() {
    // Assuming there's an HTML element to display this
    console.log(display); // Replace with the actual display logic
}