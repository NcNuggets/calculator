//-----TO DO LIST-----//

// need to remove duplicate operators with regex
// need to add a backspace functionality (pops off the last input added to array)

//-----INITIAL DECLARATIONS-----//
let displayVal = 0;
let input = [];

//-----RUNS ACCORDING TO PEMDAS (I HOPE)-----//

function operate(array) {
  let outputArr = array;
  console.log('operatestart: ' + outputArr);

  outputArr = calcPrepare(outputArr);
  console.log('afterprep: ' + outputArr);
  outputArr = multiply(outputArr);
  console.log('aftermult: ' + outputArr);
  outputArr = divide(outputArr);
  console.log('afterdiv: ' + outputArr);
  outputArr = add(outputArr);
  console.log('afteradd: ' + outputArr);
  outputArr = subtract(outputArr);
  console.log('aftersub: ' + outputArr);
  outputArr = negatives(outputArr);
  console.log('afternegs: ' + outputArr);

  input = outputArr;
  console.log('output is new input: ' + input);

  displayVal = Math.round(Number(outputArr), -3);
  displayAnswer(displayVal);
}

//-----PREPARES INPUT STRING TO BE BROKEN INTO NUMBERS AND OPERATORS-----//

function calcPrepare(array) {
  let prepared = Array.from(array);
  prepared = prepared.join('');
  prepared = prepared.match(/(\-?[0-9.]+)|([\+\-\*\/])/g);

  return prepared;
}

//-----OPERATIONS-----//

function multiply(array) {
  let inputArr = Array.from(array);
  for (i = 0; i < inputArr.length; i++) {
    if (inputArr[i] === '*') {
      inputArr.splice(i - 1, 3, Number(inputArr[i-1]) * Number(inputArr[i+1]));
    }
  }
  return inputArr;
}

function divide(array) {
  let inputArr = Array.from(array);
  for (i = 0; i < inputArr.length; i++) {
    if (inputArr[i] === '/') {
      inputArr.splice(i - 1, 3, Number(inputArr[i-1]) / Number(inputArr[i+1]));
    }
  }
  return inputArr;
}

function add(array) {
  let inputArr = Array.from(array);
  for (i = 0; i < inputArr.length; i++) {
    if (inputArr[i] === '+') {
      inputArr.splice(i - 1, 3, Number(inputArr[i-1]) + Number(inputArr[i+1]));
    }
  }
  return inputArr;
}

function subtract(array) {
  let inputArr = Array.from(array);
  for (i = 0; i < inputArr.length; i++) {
    if (inputArr[i] === '-') {
      inputArr.splice(i - 1, 3, Number(inputArr[i-1]) - Number(inputArr[i+1]));
    }
  }
  return inputArr;
}

function negatives(array) {
  let inputArr = Array.from(array);
  for (i = 0; i < inputArr.length; i++) {
    if (inputArr[i] < 0) {
      inputArr.splice(i - 1, 2, Number(inputArr[i-1]) + Number(inputArr[i]));
    }
  }
  return inputArr;
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
  return displayAnswer(displayVal);
}

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', (e) => {
  reset();
});
