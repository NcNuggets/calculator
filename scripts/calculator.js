//-----INITIAL DECLARATIONS-----//
let displayVal = 0;
let input = [];
let output = [];

//-----OPERATIONS-----//

function multiply(array) {
  let inputArr = Array.from(array);
  for (i = 0; i < inputArr.length; i++) {
    if (inputArr[i] === '*') {
      console.log(inputArr.splice(i - 1, 3, inputArr[i-1] * inputArr[i+1]));
    }
  }
  return inputArr;
}

function divide(num1, num2) {
  return num1 / num2;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function operate(operator, n1, n2) {

  displayVal = "input";
  displayAnswer(displayVal);
}

//-----PREPARES INPUT STRING TO BE BROKEN INTO NUMBERS AND OPERATORS-----//

function calcPrepare(array) {
  let prepared = array;
  prepared = prepared.join('');
  prepared = prepared.match(/(\-?[0-9.]+)|([\+\-\*\/])/g);

  return input = prepared;
}

//-----BUTTONS FOR CALCULATOR-----//

let numBtns = document.querySelectorAll('.number');
numBtns.forEach((numBtn) => {
  numBtn.addEventListener('click', (e) => {
    input.push(numBtn.innerHTML);
  });
});

let operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener('click', (e) => {
    input.push(operatorBtn.innerHTML);
  });
});

let equals = document.querySelector('.equals');
equals.addEventListener('click', (e) => {
  operate(input);
});

let decimal = document.querySelector('.decimal');
decimal.addEventListener('click', (e) => {
  input.push(decimal.innerHTML);
});

//-----DISPLAYS THE ANSWER / CALCULATION-----//

function displayAnswer(result) {
  const display = document.querySelector('#display-text');
  display.textContent = result;
}

//-----CLEAR BUTTON TO RESET CALCULATOR-----//
function reset() {
  displayVal = 0;
  input = [];
  output = [];
  return displayAnswer(displayVal);
}

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', (e) => {
  reset();
});
