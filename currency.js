let result = document.getElementById('outputConvert');

const fromSelect = document.getElementById('selectFrom');
const toSelect = document.getElementById('selectTo');
const amountInput = document.getElementById('amount-input');
const output = document.getElementById('inputToCurrency')
const swapCurrency = document.getElementById('swap')
const buttonElement = document.querySelectorAll('.button')
const deleteButton = document.querySelector('.delete');
const showMenu = document.getElementById('menu-img');
const menuList = document.getElementById('menu-list');
const menuAction = document.getElementById('menu-action');



showMenu.addEventListener('click', () => {
  menuList.classList.toggle('hide');
  menuAction.classList.add('transition')
})

document.addEventListener('click', (event) => {
  if(!menuList.classList.contains('hide') && !showMenu.contains(event.target)){
  menuList.classList.add('hide');
  }
})

menuAction.addEventListener('click', () => {
  appendSelectOptions();
  menuList.classList.toggle('hide');
})

deleteButton.addEventListener('click', () => {
  amountInput.value = amountInput.value.slice(0, -1)
  appendSelectOptions()
})

buttonElement.forEach(button => {
  button.addEventListener('click', () => {

    if(button.textContent === 'C'){
      amountInput.value = '';
      appendSelectOptions()
      return;
    }
    amountInput.value += button.textContent;
    appendSelectOptions()
  })
})


const errorMessage = document.getElementById('message');
const option1Description = document.getElementById('from-description')

const option2Description = document.getElementById('to-description')
const apiKey = '059143138d035258f5ed2a72';


async function getCurrencyOption() {

  try{


    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);

    const data = await response.json();

    return data

  }catch(error){
    result.textContent = 'Faild to fetch rates, pls try again';
  }
};

async function getCurencyRate(fromCurrency, toCurrency, amount){
  const convertUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

  try{

    const response = await fetch(convertUrl);

    const data = await response.json()

    return data;
    
  }catch (error){
    result.textContent = 'Faild to fetch rates, pls try again'
  }

};

async function appendSelectOptions(){

  try{

    const curencyCodes = await getCurrencyOption();

    const descriptions = await curencyCodes.supported_codes;

    descriptions.forEach(([codes, name]) => {

      const optionElement1 = document.createElement('option')
      optionElement1.value = codes;
      optionElement1.textContent = `${codes} - ${name}`
      fromSelect.appendChild(optionElement1);

      const optionElement2 = optionElement1.cloneNode(true)
      toSelect.appendChild(optionElement2);

      
    });

    setupCurrency();

  }catch(error){
    result.textContent = 'Connect to the network for latest rates'
    option1Description.textContent = fromSelect.value;
    option2Description.textContent = toSelect.value;

  }
    
}

window.addEventListener('DOMContentLoaded', appendSelectOptions)

amountInput.addEventListener('input', appendSelectOptions);
fromSelect.addEventListener('change', appendSelectOptions);
toSelect.addEventListener('change', appendSelectOptions);

swapCurrency.addEventListener('click', () => {
  if(fromSelect.value === toSelect.value){
    alert("cannot swap same currency")
    return;
  }

  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp
  appendSelectOptions()
})


async function setupCurrency(){
  try{

    const from = await fromSelect.value;
    const to = await toSelect.value;
    const amount = amountInput.value;

    const currencyResult = await getCurencyRate(from, to)
    const rate = await currencyResult.conversion_rate;
    const conversionResult = Number(amount * rate).toFixed(2);

    option1Description.textContent = fromSelect.value;
    option2Description.textContent = toSelect.value;

    output.value = conversionResult;

  }catch{
    result.textContent = 'Error fetching rates, pls refresh'
    
  }

}














/*
// To get just the array of currency codes:
const currencyCodes = data.supported_codes;

// If you want just the currency code strings (like ["AED", "AFN", ...]):
const codeStrings = data.supported_codes.map(pair => pair[0]);

console.log(currencyCodes); // Full list with descriptions
console.log(codeStrings);   // Just the 3-letter codes*/


