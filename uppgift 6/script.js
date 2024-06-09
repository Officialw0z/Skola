document.addEventListener('DOMContentLoaded', function() {

  const buttons = document.querySelectorAll('.digit, .op, .bsum, .bclear');

  let currentInput = '';
  let operator = null;
  let firstOperand = null;
  let isNumberEntered = false;
  const historyList = document.querySelector('.history-list');

  buttons.forEach(button => {
      button.addEventListener('click', function() {
          const display = document.querySelector('.display');
          const buttonText = button.innerText.trim();

          if (button.classList.contains('digit')) {
              currentInput += buttonText;
              display.innerText += buttonText;
              isNumberEntered = true;
          } else if (button.classList.contains('op')) {
              if (isNumberEntered) {
                  if (button.classList.contains('bsqrt')) {
                      const result = Math.sqrt(parseFloat(currentInput));
                      display.innerText = `√(${currentInput}) = ${result}`;
                      addToHistory(`√(${currentInput}) = ${result}`);
                      currentInput = result.toString();
                  } else if (button.classList.contains('bsquare')) {
                      const result = parseFloat(currentInput) * parseFloat(currentInput);
                      display.innerText = `(${currentInput})² = ${result}`;
                      addToHistory(`(${currentInput})² = ${result}`);
                      currentInput = result.toString();
                  } else {
                      if (currentInput !== '') {
                          if (firstOperand === null) {
                              firstOperand = parseFloat(currentInput);
                          } else {
                              firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
                              display.innerText = firstOperand + ' ' + buttonText + ' ';
                          }
                      }
                      operator = buttonText;
                      currentInput = '';
                      display.innerText += ' ' + operator + ' ';
                      isNumberEntered = false;
                  }
              }
          } else if (button.classList.contains('bsum')) {
              if (firstOperand !== null && operator !== null && currentInput !== '') {
                  const secondOperand = parseFloat(currentInput);
                  const result = calculate(firstOperand, secondOperand, operator);
                  display.innerText = result;
                  addToHistory(`${firstOperand} ${operator} ${secondOperand} = ${result}`);
                  currentInput = result.toString();
                  firstOperand = null;
                  operator = null;
                  isNumberEntered = true;
              }
          } else if (button.classList.contains('bclear')) {
              currentInput = '';
              operator = null;
              firstOperand = null;
              display.innerText = '';
              isNumberEntered = false;
          }
      });
  });

  function calculate(firstOperand, secondOperand, operator) {
      switch (operator) {
          case '+':
              return firstOperand + secondOperand;
          case '-':
              return firstOperand - secondOperand;
          case '*':
              return firstOperand * secondOperand;
          case '/':
              return firstOperand / secondOperand;
          default:
              return secondOperand;
      }
  }

  function addToHistory(entry) {
      const historyItem = document.createElement('li');
      historyItem.innerText = entry;
      historyList.appendChild(historyItem);
  }

  const clearHistoryButton = document.querySelector('.clear-history');

  clearHistoryButton.addEventListener('click', function() {
      historyList.innerHTML = ''; 
  });
});
