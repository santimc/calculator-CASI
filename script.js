let ans;
let displayError = false;
displayContent = document.querySelector("#display");

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', display);
});

function operate(operator, n1, n2){
  console.log(n1 + operator + n2);
  if (/\D/.test(n2)){
    return Number(n1);
  }
  n1 = Number(n1);
  n2 = Number(n2);
  switch (operator) {
    case "+":
      return add(n1, n2);
    case "-":
      return subtract(n1, n2);
    case "x":
      return multiply(n1, n2);
    case "/":
      return divide(n1, n2);
    default: console.error("Somthig went wrong whit the operate");
  }
}

function resolve(expression) {
  let expressionArray = expression.split(/([^0-9^\.])/).filter(Boolean);
  console.log(expressionArray);
  let arrayInitialLength = expressionArray.length
  for (var j = 1; j < arrayInitialLength; j++) {
    expressionArray.forEach((item, i) => {
      if (i == 0 ||  /\D/.test(item)) {
        expressionArray.splice(i, 1)
      } else if (item == "x" || item == "/") {
        expressionArray.splice(i - 1, 3 ,operate(expressionArray[i], expressionArray[i-1], expressionArray[i+1]));
      }else if (item == "+" || item == "-") {
        expressionArray.splice(i - 1 , 3 ,operate(expressionArray[i], expressionArray[i-1], expressionArray[i+1]));
      }
    });
  }
  console.log(expressionArray);
  expressionArray[0] = Number(expressionArray[0]);
  ans = +expressionArray[0].toFixed(4);
  if (ans == Infinity) {
    displayError = true;
    return "DO NOT DIVIDE BY ZERO!!!"
  } else if (ans == [] || ans == NaN) {
    displayError = true;
    return "NOT A NUMBER!!!"
  } else {
    return ans
  }
}

const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => n1 / n2;


function display(e){
  const buttonValue = e.target.textContent
  if (displayError) {
    displayContent.textContent = "";
    displayError = false;
  }
  displayContent.textContent += buttonValue;
  switch (buttonValue) {
    case "=":
      displayContent.textContent = resolve(displayContent.textContent);
      break;
    case "AC":
      displayContent.textContent = "";
      break;
  }
}
