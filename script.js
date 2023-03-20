//código implementando dinâmica visual

const btnsombra = document.querySelectorAll('.calc_buttons');

btnsombra.forEach((calc_buttons) => {
    calc_buttons.addEventListener("mousedown", buttonDown);
    calc_buttons.addEventListener("touchstart", buttonDown);
    calc_buttons.addEventListener("mouseup", buttonUp);
    calc_buttons.addEventListener("touchend", buttonUp);
    
    
});

function buttonDown() {
    this.classList.add('calc_buttons-efect')
    
}

function buttonUp() {
    this.classList.remove('calc_buttons-efect')
    
}

/*const calcContainer = document.querySelector('.calc_container')
const darkModeSwitch = document.querySelector('#input-dark-mode');
darkModeSwitch.addEventListener('click', darkMode)
function darkMode(){
    calcContainer.classList.toggle('darkMode');
    for(let pos in btnsombra){
        btnsombra[pos].classList.toggle('calc_buttons-darkMode')
    }    
}
*/

   
//-----------------------------------------------

//Código de inputs
const numbers = document.querySelectorAll('.number');
const result = document.querySelector('.results span');
const equals = document.querySelector('.equals');
const dot = document.querySelector('.dot');
const percent = document.querySelector('.percent');
const negative = document.querySelector('.negative');
const clear = document.querySelector('.clear');
const signs = document.querySelectorAll('.sign');

let firstValue = '' ;
let isFirstValue = false;
let secondValue = '' ;
let sign = "";
let resultValue = 0;

// Atribuição de Event Listeners --------------------
negative.addEventListener('click', handleNegative);

percent.addEventListener('click',handlePercent);

clear.addEventListener('click',clearResults); //botão limpar

equals.addEventListener('click', doMath); //botão igual à

numbers.forEach((clickedNumber)=>{
    clickedNumber.addEventListener('click', handleTypedNumber )  //botões de números
})

signs.forEach((clickedSign)=>{
    clickedSign.addEventListener('click', getMathSign )  //botões de sinais (operadores matemáticos)
})

// -------------------------------------------------

// Funções de armazenagem de valores digitados------

function handleTypedNumber(event){  //função que captura o valor dos botões numericos

    let clickedNumber = event.target.getAttribute('value');
    if(isFirstValue == false){
        getFirtValue(clickedNumber);
        
    }else{
        getSecondValue(clickedNumber);
        
    }
}
function getFirtValue(clickedNumber){
    
    firstValue += clickedNumber;
    result.innerHTML = firstValue;
      
    console.log('o primeiro valor digitado foi '+firstValue);
}

function getMathSign(clickedSign){
    
    sign = clickedSign.target.getAttribute('value');
    isFirstValue = true;
     
}

function getSecondValue(clickedNumber){
    
    secondValue += clickedNumber;
    result.innerHTML = secondValue;
    console.log('o segundo valor digitado foi ' +secondValue);
}

function clearResults(){
    result.innerHTML = '0';
    firstValue = '' ;
    isFirstValue = false;
    secondValue = '' ;
    sign = "";
    resultValue = 0;
}

//-----------------------------------------------
//Código de cálculos
function handlePercent(){
    let percentValue;

    if(firstValue != '' && isFirstValue == false && sign == ""){
        percentValue = firstValue/100;
        firstValue = percentValue;
        result.innerHTML = percentValue;
    }else if(isFirstValue == true && secondValue !="" && sign != ""){
        percentValue = secondValue/100;
        secondValue = percentValue;
        console.log('aqui o secondValue '+secondValue);
        result.innerHTML = percentValue;
        
    }else{
        result.innerHTML = "Error";
    }
    
}

function handleNegative(){
    let negativeValue;
    if(firstValue != '' && isFirstValue == false && sign == ""){
        negativeValue = firstValue*(-1);
        firstValue = negativeValue;
        result.innerHTML = negativeValue;
    }else if(isFirstValue == true && secondValue !="" && sign != ""){
        negativeValue = secondValue*(-1);
        secondValue = negativeValue;
        result.innerHTML = negativeValue;
    }else{
        result.innerHTML = "Error";
    }
    
}

function doMath(){
    switch(sign){
        case '+':
            handleSum();
            break;
        case '-':
            handleSubtraction();
            break;
        case '÷':
            handleDivision();
            break;
        case 'x':
            handleMultipication();
            break;
    }
    resultApproximate();
}

function handleSum(){
    result.innerHTML = '';
    resultValue = Number.parseFloat(firstValue) + Number.parseFloat(secondValue);
    result.innerHTML = resultValue;
    firstValue = resultValue;
    isFirstValue = false;
    secondValue = '';
    sign = '';
    
}
function handleSubtraction(){
    result.innerHTML = '';
    resultValue = Number.parseFloat(firstValue) - Number.parseFloat(secondValue);
    result.innerHTML = resultValue;
    firstValue = resultValue;
    secondValue = '';
    sign = '';
    isFirstValue = false;

}
function handleDivision(){
    if(secondValue==0){
        result.innerHTML = 'Math Error';
        firstValue = '' ;
        isFirstValue = false;
        secondValue = '' ;
        sign = "";
        return;
    }else{
        result.innerHTML = '';
        resultValue = Number.parseFloat(firstValue) / Number.parseFloat(secondValue);
        result.innerHTML = resultValue;
        firstValue = resultValue;
        secondValue = '';
        sign = '';
        isFirstValue = false;
        
    }
}
function handleMultipication(){
    result.innerHTML = '';
    resultValue = Number.parseFloat(firstValue) * Number.parseFloat(secondValue);
    result.innerHTML = resultValue;
    firstValue = resultValue;
    secondValue = '';
    sign = '';
    isFirstValue = false;
}
function resultApproximate(){
    resultValue = resultValue.toString();
    let dotPos = resultValue.indexOf(".");
    let numBeforeDot = dotPos == -1 ? resultValue.length : dotPos;
    let numAfterDot = dotPos == -1 ? resultValue.length : (Number(resultValue.length) - (dotPos+1));
    console.log('before '+ numBeforeDot);
    console.log('after '+ numAfterDot);

    if((resultValue.length>9 && dotPos == -1) || (numBeforeDot>9 && dotPos != -1)){
        resultValue = Number.parseFloat(resultValue);
        result.innerHTML = resultValue.toExponential(8);
        return;
    }if(numBeforeDot<=1 && numAfterDot>8 && numBeforeDot!=resultValue.length){
        resultValue = Number.parseFloat(resultValue);
        result.innerHTML = resultValue.toFixed(8);
        return;
    }if(numBeforeDot<=2 && numAfterDot>7 && numBeforeDot!=resultValue.length){
        resultValue = Number.parseFloat(resultValue);
         result.innerHTML = resultValue.toFixed(7);
         return;
    }if(numBeforeDot<=3 && numAfterDot>6 && numBeforeDot!=resultValue.length){
        resultValue = Number.parseFloat(resultValue);
         result.innerHTML = resultValue.toFixed(6);
         return;
    }if(numBeforeDot=4 && numAfterDot>5 && numBeforeDot!=resultValue.length){
        resultValue = Number.parseFloat(resultValue);
        result.innerHTML = resultValue.toFixed(5);
        return;
    }if(numBeforeDot<=5 && numAfterDot>4 && numBeforeDot!=resultValue.length){
        resultValue = Number.parseFloat(resultValue);
        result.innerHTML = resultValue.toFixed(4);
        return;
    }if(numBeforeDot<=6 && numAfterDot>3 && numBeforeDot!=resultValue.length){
        resultValue = Number.parseFloat(resultValue);
        result.innerHTML = resultValue.toFixed(3);
        return;
    }if(numBeforeDot<=7 && numAfterDot>2 && numBeforeDot!=resultValue.length){
        resultValue = Number.parseFloat(resultValue);
        result.innerHTML = resultValue.toFixed(2);
        return;
    }if(numBeforeDot<=8 && numAfterDot>1 && numBeforeDot!=resultValue.length){
        resultValue = Number.parseFloat(resultValue);
        result.innerHTML = resultValue.toFixed(1);
        return;
    }
    
}





    
//-----------------------------------------------
