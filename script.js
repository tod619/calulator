const calculatorDisplay = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-btn')

let firstValue = 0
let operatorValue = ''
let awaitingNextValue = false 

function sendNumbeValue(number) {
    
    // Replace currentDisplayValue if firstValue is entered
    if(awaitingNextValue) {
        calculatorDisplay.textContent = number
        awaitingNextValue = false 
    } else {
        // if current display number is 0 replace if not add number
        const displayValue = calculatorDisplay.textContent
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number
    }
}

// Add 1 decimal point in the number
function addDecimal() {
    // if operator is clicked don't add decimal after
    if(awaitingNextValue) return 

    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

// Calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
}

// Use operator
function useOperator(operator) {
    // Prevent multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator
        return
    } 
    const currentValue = Number(calculatorDisplay.textContent)
    // Assign currentValue to firstValue if firstValue has no value
    if(!firstValue) {
        firstValue = currentValue
    }else {
        const caluclation = calculate[operatorValue](firstValue, currentValue)
        
        calculatorDisplay.textContent = caluclation
        firstValue = caluclation
    }

    // Ready for the next value
    awaitingNextValue = true    
    operatorValue = operator
}

// Add Eventlisnters for numbers, operatoros, & decimals buttons
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumbeValue(inputBtn.value))
    } else if(inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    } else if(inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal())
    }
})

// Reset the value in the display + all other values
function resetAll() {
    firstValue = 0
    operatorValue = ''
    awaitingNextValue = false
    calculatorDisplay.textContent = '0'
    
}

clearBtn.addEventListener('click', resetAll)