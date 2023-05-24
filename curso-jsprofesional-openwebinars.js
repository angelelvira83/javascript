/*
USAR ARGUMENTOS
process.argv (incluye todos, en node script hola, "hola" es [2])

VARIABLES
var: puede redeclararse y cambiarse 
let: puede cambiarse pero no redeclararse en el mismo bloque
const: es constante

// Escribe lo del console 2 segundos después del seteo
setTimeout(function timer() {
    console.log('You clicked the button!');    
}, 2000)

*/

function duplicateInt(i) {
    return 2*2;
}

setTimeout(function timer() {
    console.log('You clicked the button!');    
}, 2000);

function duplicateInt2(it) {
    return it.map(o => o*2);
}

function main (i) {
    console.log("Test duplicado\n")
    console.log(duplicateInt(i))
    console.log("Test duplicado map\n")
    console.log(duplicateInt2([1,2,3]))
}

main(process.argv[2])