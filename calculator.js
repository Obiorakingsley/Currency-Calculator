let calc = '';

const inputElement = document.getElementById('input-calc');

const outputElement = document.getElementById('output-calc');

const multiply = document.querySelector('.calculation-multiply');

const solve = document.getElementById('solve');

const del = document.querySelector('.delete')

const buttonElement = document.querySelectorAll('.calculation');

inputElement.value = '';

solve.addEventListener('click', () => {
  if(!calc || /[+\-*/.]$/.test(calc)){
    return;
  };

  if(/[+\-*/.]/.test(calc) && /[+\-*/.]$/.test(inputElement.value)){
    return;
  }
  calc = eval(calc);
  inputElement.value = calc;
  outputElement.textContent = ''
})

multiply.addEventListener('click', () => {
  calc += '*';
  inputElement.value = calc;
});


del.addEventListener('click', () => {
 /* let lastChar = inputElement.slice(-1);
  let numbers = '0123456789';*/
  inputElement.value = inputElement.value.slice(0, -1);
  calc = inputElement.value;

  // checks if the input value ends with an operator

  if(/[+\-*/.]$/.test(calc)){
    outputElement.textContent = ''
  }

  // checks if an operator exist in the input

  if(/[+\-*/]/.test(calc)){

      // checks if the input value ends with an operator

      if(/[+\-*/.]$/.test(calc)){
        return;
      }else if (/[+\-*/]/.test(calc)){
        outputElement.textContent = eval(inputElement.value)
      }
      
      
    }

});


Array.from(buttonElement).forEach((buttons) => {
  buttons.addEventListener('click', (event) => {
    if(event.target.innerHTML == 'C') {
      inputElement.value = "";
      calc = '';
      outputElement.textContent = calc;
      return;
    }

    calc += event.target.innerHTML;
    inputElement.value = calc;


    function output(){
      
    
    if(/[+\-*/]/.test(calc)){
      if(/[+\-*/.]$/.test(calc)){
        return;
      }else{
        outputElement.textContent = eval(inputElement.value)
      }
    }

  }
    output()

  })
  
})








