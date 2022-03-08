const calculatorDisplay = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-btn')

function sendNumbeValue(number) {
    
    // if current display number is 0 replace if not add number
    const displayValue = calculatorDisplay.textContent
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number 
}

// Add 1 decimal point in the number
function addDecimal() {
    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

// Add Eventlisnters for numbers, operatoros, & decimals buttons
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumbeValue(inputBtn.value))
    } else if(inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => sendNumbeValue(inputBtn.value))
    } else if(inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal())
    }
})

// Reset the value in the display
function resetAll() {
    calculatorDisplay.textContent = '0'
}

clearBtn.addEventListener('click', resetAll)