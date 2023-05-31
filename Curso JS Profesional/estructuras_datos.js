
// PILA (POP Y PUSH)
let lista = [2,4,6,8,10,12,14,16,18]
console.log("Partimos de la lista: " +  lista)

let sacamos_de_pila = lista.pop()
console.log("Tras un pop nos queda: " +  lista)

let metemos_de_pila = lista.push("44")
console.log("Tras un push nos queda: " +  lista)

console.log("********************")

// COLA (SHIFT Y UNSHIFT)
let cola = [2,4,6,8,10,12,14,16,18]
console.log("Partimos de la lista: " +  cola)

let sacamos_de_cola = cola.shift()
console.log("Tras un SHIFT nos queda: " +  cola)

let metemos_de_cola = cola.unshift("44")
console.log("Tras un UNSHIFT nos queda: " +  cola)