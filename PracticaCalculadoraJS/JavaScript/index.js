window.addEventListener('load', () => {   
    const keypadButtons = document.getElementsByClassName('tecla');
    const display = document.getElementById('divProcedimiento');
    const displayTotal = document.getElementById('divTotal');
    const historial = document.getElementById('divHistorial');
    const keypadButtonsArray = Array.from(keypadButtons);

    keypadButtonsArray.forEach( (button) => {

        button.addEventListener('click', () => {
            /* Llamo a una funcion cada vez que ocurra un click */
            try{
                calculadora(button, display, displayTotal, historial);
            }catch(e){
                if(e instanceof SyntaxError){
                    alert('Error en el formato');
                }
            }
        });

    });
});
function calculadora(button, display, displayTotal, historial) {
    /* funcion que decide que hacer */
    switch (button.innerHTML) {
        case 'C':
            borrar(display, displayTotal);
            break;

        case '=':
            calcular(display, displayTotal, historial);
            break;

        default:
            actualizar(display, button, displayTotal);
            break;
    }

}

function calcular(display, displayTotal, historial) {
    const resultado = raices(display.innerHTML);
    historial.innerHTML += display.innerHTML
    historial.innerHTML += ' = ' + resultado + '<br><br>'; 
    displayTotal.innerHTML = resultado;
    display.innerHTML = "";
}

function actualizar(display, button, displayTotal) {
    pantallaCero(display, displayTotal);
    let procedimiento = display.innerHTML;
    let boton = button.innerHTML;
    let finalChar = procedimiento.charAt(procedimiento.length - 1);
    switch(manejador(finalChar, boton)){
        case 'signo':
            procedimiento = procedimiento.substring(0, procedimiento.length - 1);
            procedimiento += button.innerHTML;
            break;
        case 'borrar':
            procedimiento = procedimiento.substring(0, procedimiento.length - 1);
            break;
        case 'signoblanco':
            procedimiento = 0;
            break;
        case '()':
            procedimiento += parentesis(procedimiento);
            break;
        case '^':
            if(validadorPotencia(procedimiento)){
                procedimiento += '^(';
            }else{
               alert('formato incorrecto');
            }
            break;
        case 'raiz':
            procedimiento += '√(';
        break;
        case 'Na':
            procedimiento += button.innerHTML;
            break;
        }
        display.innerHTML = procedimiento;
}
//manejador de posibilidades
const manejador = (finalChar, button) => { 
    //si intentas poner un signo luego de otro signo se regresa 1
    if((finalChar == '+' || finalChar == '-' || finalChar == '*' || finalChar == '/' || finalChar == '.') && (button == '+' || button == '-' || button == '*' || button == '/' || button == '.')){
        return 'signo';
    }
    //si apachas el boton de borrar se regresa 2
    if(button == '⌫'){
        return 'borrar';
        
    }
    // si pones un signo despues de un espacio blanco regresa 3
    if(finalChar == '' && (button == '+' ||button == '-' || button == '*' || button == '/' )){
        return 'signoblanco';
    } 
    // si pones el boton parentesis regresa 4
    if(button == '()'){
        return '()';
    }
    //si pones potencia regresa potencia
    if(button == '^'){
        return '^';
    }
    //si pones raíz regresa raiz
    if(button == '√'){
        return 'raiz';
    }
    //no hay ninguna situacion peculiar
    return 'Na';
}

function borrar(display, displayTotal) {
    if(display.innerHTML != 0 || displayTotal.innerHTML != '') {
        display.innerHTML = 0;
        displayTotal.innerHTML = "";
        
    }
}

function parentesis(cadena){
    let caracter;
    let llave = false;
    let controlador = false;
    for(var i = 0; i < cadena.length; i++){
        caracter = cadena.charAt(i);
        if(llave){
            controlador = true;
            if(caracter == ')'){
                controlador = false;
                llave = false;
            }
        }
        if(caracter == '('){
            llave = true;
        }
    }
    if(controlador){
        return ')';
    }else{
        return '(';
    }

}
//*funcion para convertir los decimales*//
function redondearDecimales(numero, decimales) {
    numeroRegexp = new RegExp('\\d\\.(\\d){' + decimales + ',}');
    if (numeroRegexp.test(numero)) {      
        return Number(numero.toFixed(decimales));
    } else {
        return Number(numero.toFixed(decimales)) === 0 ? 0 : numero; 
    }
}
//funcion que maneja raiz y potencia
function resolverPotenciaYRaiz(cadena){
    let caracter;
    let llave = false;
    let controlador = false;
    for(var i = 0; i < cadena.length; i++){
        caracter = cadena.charAt(i);
        console.log(caracter);
        if(llave){
            controlador = true;
            if(caracter == ')'){
                controlador = false;
                llave = false;
            }
        }
        if(caracter == '('){
            llave = true;
        }
    }
    if(controlador){
        return ')';
    }else{
        return '(';
    }
}
//funcion q valida si se puede poner potencia
function validadorPotencia(cadena){
    if(validadorCaracterNumero(cadena.charAt(cadena.length - 1), cadena.charAt(cadena.lengt-2))){
        return true;
    }
    return false;
}
//funcion para cuando es 0 la pantalla
function pantallaCero(display, displayTotal){
    if(display.innerHTML == 0){
        display.innerHTML = "";
    }
    if(displayTotal.innerHTML != ""){  
        displayTotal.innerHTML = '';
    }
}

const validadorCaracterNumero = (caracter, caracterAnterior) =>{
    let numero = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    if(caracter == 1 || caracter == 2 || caracter == 3 || caracter == 4 || caracter == 5 || caracter == 6 || caracter == 7 || caracter == 8 || caracter == 9){
        return true;
    }
    if(caracterAnterior!=''){
        for (let i = 0; i < 10; i++){
            if(caracter == 0 && caracterAnterior == numero[i] ){
                return true;

            }
        }
    }
    return false;
}

//funcion que cambia el formato de potencia para poder resolverse por eval
const formatoPotencia = (cadena) =>{
    let cadenaNueva;
    for(var i = 0; i < cadena.length; i++){
        if(cadena.charAt(i)=='^'){
            cadenaNueva = cadena.substring(0, i);
            cadenaNueva += '**';
            cadenaNueva += cadena.substring(i+1,cadena.length); 
            return cadenaNueva;
        }
    }
    return cadena;
}
//manejador de potencia y raiz
const raices = (cadena) =>{
    cadena = formatoPotencia(cadena);
    let cadenaInicio;
    let raiz;
    let cadenaFinal;
    let contadorRaiz;
    let caracterDeContador = '';
    for(var i = 0; i < cadena.length; i++){
        if(cadena.charAt(i)=='√'){
            contadorRaiz = i + 1;
                do{
                    contadorRaiz = contadorRaiz+1;
                    caracterDeContador = cadena.charAt(contadorRaiz);
                    if(contadorRaiz == 2000){
                        caracterDeContador = ')';
                        alert('No cerraste el parentesis de la raíz');
                    }
                }
                while( caracterDeContador !=')' );                     
                cadenaInicio = cadena.substring(0, i);
                raiz = cadena.substring(i + 1, contadorRaiz + 1);
                cadenaFinal = cadena.substring(contadorRaiz + 1, cadena.lengt);
                cadena = cadenaInicio+calcularRaiz(raiz)+cadenaFinal;
        }
    }
    cadena = redondearDecimales(eval(cadena), 3);
    return cadena;
} 

const calcularRaiz = (raiz) => {
    raiz = eval(raiz);
    raiz = Math.sqrt(raiz);
    return  raiz;
}