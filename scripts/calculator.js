//-----TO DO LIST-----//


//-----INITIAL DECLARATIONS-----//
let displayVal = 0;
let input = [];

//-----RUNS ACCORDING TO PEMDAS (I HOPE)-----//

function operate(array) {
  let outputArr = array;

  outputArr = prepare(outputArr);
  outputArr = multiply(outputArr);
  outputArr = divide(outputArr);
  outputArr = add(outputArr);
  outputArr = subtract(outputArr);

  input = outputArr;

  displayVal = preciseRound(Number(outputArr), 2);
  display(displayVal);
}

//-----PREPARES INPUT STRING TO BE BROKEN INTO NUMBERS AND OPERATORS-----//

function prepare(array) {
  let prepared = Array.from(array);
  prepared = prepared.join('');
  prepared = prepared.match(/([0-9.]+)|([\+\-\*\/])/g);

  return prepared;
}

//-----DISPLAYS THE ANSWER / CALCULATION-----//

function display(result) {
  let displayArea = document.querySelector('#display-text');
  displayArea.textContent = result;
}

//-----BACKSPACE BUTTON-----//

let backSpace = document.querySelector('.backspace');
backSpace.addEventListener('click', (e) => {
  input.pop();

  if (input.length === 0) {
    input.push(0);
  }

  display(input.join(' '));
});

//-----CLEAR BUTTON TO RESET CALCULATOR-----//
function reset() {
  displayVal = 0;
  input = [];

  return display(displayVal);
}

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', (e) => {
  reset();
});

//-----OPERATIONS-----//

function multiply(array) {
  let inputArr = Array.from(array);
  for (i = 0; i < inputArr.length; i++) {
    if (inputArr.includes('*')) {
      if (inputArr[i] === '*') {
        inputArr.splice(i - 1, 3, Number(inputArr[i-1]) * Number(inputArr[i+1]));
        i--;
      }
    }
  }

  return inputArr;
}

function divide(array) {
  let inputArr = Array.from(array);
  for (i = 0; i < inputArr.length; i++) {
    if (inputArr.includes('/')) {
      if (inputArr[i] === '/') {
        inputArr.splice(i - 1, 3, Number(inputArr[i-1]) / Number(inputArr[i+1]));
        i--;
      }
    }
  }

  return inputArr;
}

function add(array) {
  let inputArr = Array.from(array);
  for (i = 0; i < inputArr.length; i++) {
    if (inputArr.includes('+')) {
      if (inputArr[i] === '+') {
        inputArr.splice(i - 1, 3, Number(inputArr[i-1]) + Number(inputArr[i+1]));
        i--;
      }
    }
  }

  return inputArr;
}

function subtract(array) {
  let inputArr = Array.from(array);
  for (i = 0; i < inputArr.length; i++) {
    if (inputArr.includes('-')) {
      if (inputArr[i] === '-') {
        inputArr.splice(i - 1, 3, Number(inputArr[i-1]) - Number(inputArr[i+1]));
        i--;
      }
    }
  }

  return inputArr;
}

function preciseRound(number, precision) {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

//-----BUTTONS FOR CALCULATOR-----//

let buttons = document.querySelectorAll('.btn');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    input.push(button.innerHTML);
    display(input.join(' '));
  });
});

//-----EQUALS BUTTON-----//

let equals = document.querySelector('.equals');
equals.addEventListener('click', (e) => {
  operate(input);
});
