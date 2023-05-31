/*
https://developer.mozilla.org/en-US/docs/Glossary/Primitive
https://javascript.info/types
https://javascript.info/primitives-methods

TIPOS PRIMITVOS
- string
- number
- boolean
->Estos tres se pasan por valor

- null
- undefined
- symbol
- object
-> Los objectos, arrays, funciones... se pasan por referencia 


Prototype array
slice: como es substring, sin nada devuelve lo mismo. Puedes poner inicio y final (el final es "no incluido")


*/

// Creando un objecto y agregando un valor
// Vale con new Number, new String y new Boolean
let objecto = new Object()
objecto.agrego = "agrego"
objecto.numero = 1
console.log(objecto) // --> { agrego: 'agrego', numero: 1 }

let objecto1 = new Object()
objecto1.agrego = "agrego"

let objecto2 = objecto1

objecto1.numero = 1
objecto1.agrego = "lll"

console.log(objecto1)
console.log(objecto2)

//Prototype array
//slice: como es substring, sin nada devuelve lo mismo. Puedes poner inicio y final (el final es "no incluido")
let lista1 = [1,2,3,4]
let lista2 = lista1.slice(0,2)
console.log(lista2) // --> [1,2]


// Reduce: aplica una operación a cada valor de un array. Lo que retorna es la salida a la siguiente iteración
//const sumWithInitial = array1.reduce(
//    (accumulator, currentValue) => operacion, [initialValue])

let frase = "La casa de María es verde y amplia"
var cadena = frase.split("")

const sumWithInitial = cadena.reduce(
    (accumulator, currentValue) => { if (currentValue == 'a') return accumulator+1; else return accumulator }, 0)

console.log("Suma: " + sumWithInitial)

// Los ....
let op1,op2
[op1,op2,op3, ...rest] = [1,2,3,4,5,6,7,8,9]
console.log(op3)


// Map: aplica una operación a cada elemento del array
let map = [1,2,3,4,5]
let mapby3 = map.map(elem => elem*3)
console.log("Map: " + mapby3)

// Filter: crea un nuevo array con los elementos que cumplan una condición

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);







