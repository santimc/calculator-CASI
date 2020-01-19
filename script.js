displayContent = document.querySelector("#display");

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', display);
});

function operate(operator, n1, n2){
  n1 = parseInt(n1);
  n2 = parseInt(n2);
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
  let expressionArray = expression.split(/(\D)/).filter(Boolean);
  let arrayInitialLength = expressionArray.length
  for (var i = 1; i < arrayInitialLength; i++) {
    expressionArray.forEach((item, i) => {
      if (item == "x" || item == "/") {
        expressionArray.splice(i - 1, 3 ,operate(expressionArray[i], expressionArray[i-1], expressionArray[i+1]));
      }
      if (item == "+" || item == "-") {
        expressionArray.splice(i - 1 , 3 ,operate(expressionArray[i], expressionArray[i-1], expressionArray[i+1]));
      }
    });
  }
}

const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => n1 / n2;


function display(e){
  //e.target.textContent is the value of the button
  displayContent.value += e.target.textContent
  if (e.target.textContent == "=") {
    operate(displayContent.value);
  }
}
