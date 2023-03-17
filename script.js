//código implementando dinâmica visual

const btnsombra = document.querySelectorAll('.calc_buttons');

btnsombra.forEach((calc_buttons) => {
    calc_buttons.addEventListener("mousedown", buttonDown);
    calc_buttons.addEventListener("touchstart", buttonDown);
    calc_buttons.addEventListener("mouseup", buttonUp);
    calc_buttons.addEventListener("touchend", buttonUp);
});

function buttonDown() {
    this.style.boxShadow = "inset 5px 5px 10px #bebebe,inset -5px -5px 10px #ffffff"; //inserir esses estilos em uma classe e inserir no elemento! retirar css do JS
    this.style.border = "solid 4px white"; //inserir esses estilos em uma classe e inserir no elemento! retirar css do JS
}

function buttonUp() {
    this.style.boxShadow = "";
    this.style.border = "";
}

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
    
}

function handleSum(){
    result.innerHTML = '';
    resultValue = Number.parseFloat(firstValue) + Number.parseFloat(secondValue);
    result.innerHTML = resultValue;
    firstValue = resultValue;
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
    }
}
function handleMultipication(){
    result.innerHTML = '';
    resultValue = Number.parseFloat(firstValue) * Number.parseFloat(secondValue);
    result.innerHTML = resultValue;
    firstValue = resultValue;
    secondValue = '';
    sign = '';
}




//-----------------------------------------------




