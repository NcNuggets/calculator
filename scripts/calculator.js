//-----TO DO LIST-----//

// need to fix infinite loop if operator at the start of the STRING
// if

//-----INITIAL DECLARATIONS-----//
let input = [0];

//-----RUNS ACCORDING TO PEMDAS (I HOPE)-----//

function operate(array) {
  let outputArr = array;

  outputArr = prepare(outputArr);
  outputArr = multiply(outputArr);
  outputArr = divide(outputArr);
  outputArr = add(outputArr);
  outputArr = subtract(outputArr);

  input = outputArr;

  if (isNaN(preciseRound(outputArr, 3))) {
    reset();
  } else {
    display(preciseRound(outputArr, 3));
  }
}

//-----PREPARES INPUT STRING TO BE BROKEN INTO NUMBERS AND OPERATORS-----//

function prepare(array) {
  let prepared = Array.from(array);

  prepared = prepared.join('');
  console.log(prepared);
  prepared = prepared.match(/([0-9.]+)|([\+\-\*\/])/g);
  console.log(prepared);

  if (RegExp(/([\+\-\*\/])/g).test(prepared[prepared.length - 1])) {
    prepared.pop();
    console.log(prepared);
  } else if (RegExp(/(^[\-])/g).test(prepared[0])) {
    prepared.splice(0, 2, prepared[0] + prepared[1]);
    console.log(prepared);
  } else if (RegExp(/(^[\+\*\/])/g).test(prepared[0])) {
    prepared.shift();
    console.log(prepared);
  }

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

  display(input.join(''));
});

//-----CLEAR BUTTON TO RESET CALCULATOR-----//
function reset() {
  input = [0];
  return display(0);
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
        inputArr.splice(i - 1, 3, preciseRound(Number(inputArr[i - 1]) *
        Number(inputArr[i + 1]), 3));
        i--; // move back 1 after running because it was skipping instances
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
        inputArr.splice(i - 1, 3, preciseRound(Number(inputArr[i - 1]) /
        Number(inputArr[i + 1]), 3));
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
        inputArr.splice(i - 1, 3, preciseRound(Number(inputArr[i - 1]) +
        Number(inputArr[i + 1]), 3));
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
        inputArr.splice(i - 1, 3, preciseRound(Number(inputArr[i - 1]) -
        Number(inputArr[i + 1]), 3));
        i--;
      }
    }
  }

  return inputArr;
}

// needed to create a rounder so the number lengths didn't get out of control
function preciseRound(number, precision) {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

//-----BUTTONS FOR CALCULATOR-----//

let buttons = document.querySelectorAll('.btn');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    let latestInput = (input.length > 0) ? input[input.length - 1] : input[0];

    // needed to replace the first digit of 0 so there isn't a string of 0's
    // at the start of the input
    if (input[0] == 0 && input.length <= 1) {
      input.pop();
    }

    // needed to replace the last input if the input array became too long for
    // the display
    if (input.length < 15) {
      input.push(button.innerHTML);
      display(input.join(''));
    }

  });
});

//-----EQUALS BUTTON-----//

let equals = document.querySelector('.equals');
equals.addEventListener('click', (e) => {
  prepare(input);
  //operate(input);
});
