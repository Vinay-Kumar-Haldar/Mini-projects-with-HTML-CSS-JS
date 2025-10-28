  
    let display = document.getElementById('display');
    let currentInput = '0';
    let operatorPressed = false;  
    /* As operation is performed with the calculator.So, operatorPressed is false.it means False means: “Currently, the next key should append (or replace 0) instead of starting a new entry (calculation)from a result of previous calculation.""
    It only becomes true in two cases:
    1. When calculation is successfully done,the next calculation freshly starts.
    2. Error occurs(Error) and then the next calculation freshly starts.
    */

    function updateDisplay() {
      display.value = currentInput;
    }

    function appendToDisplay(value) {
      if (currentInput === '0' || operatorPressed) { //||=> OR operator
        currentInput = value;
        operatorPressed = false;
      } else {
        currentInput += value;
      }
      updateDisplay();
    }

    function clearDisplay() {
      currentInput = '0';
      operatorPressed = false;
      updateDisplay();
    }

function Backspace() {
  let display = document.getElementById('display');
  let currentInput = display.value;

  // Remove the last character
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0'; // Reset to 0 if only one digit left
  }

  // Update display
  display.value = currentInput;
}




    function calculate() {
      let expression = currentInput.replace(/%/g, '/100'); // Handle % as divide by 100 for percentage
      expression = expression.replace(/sqrt\(/g, 'Math.sqrt('); // Replace sqrt( with Math.sqrt(
      
      try {
        // Use a safer eval alternative with a function constructor
        let result = new Function('return ' + expression)();
        
        // Format the result to avoid precision issues
        if (Number.isFinite(result)) {
          result = parseFloat(result.toFixed(10)); // Limit to 10 decimal places to avoid floating point errors
        }
        
        currentInput = result.toString();
        operatorPressed = true;
      } catch (error) {
        currentInput = 'Error';
        operatorPressed = true;
      }
      
      updateDisplay();
    }

    // Handle keyboard input for enhanced usability
    document.addEventListener('keydown', function(event) {
      const key = event.key;
      if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
      } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        appendToDisplay(key);
      } else if (key === 'Enter') {
        calculate();
      } else if (key === 'Backspace' || key === 'Delete') {
        clearDisplay();
      } else if (key === '(' || key === ')') {
        appendToDisplay(key);
      }
    });

    // Initialize display
    updateDisplay();
  
