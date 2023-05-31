
var futbolista = {
    piernas: 2,
    sabeLeer: true,
    correr() {
        console.log("corriendo")
    },
    rematar() {
        console.log("rematamaaaaa")
    },
    defiende() {
        console.log("defendiendo")
    }
}

// Coge el proto y hereda sus cosas
var gabi = {
    nombre: "Gabi",
    numero: 14,
    __proto__: futbolista
}

var almaGabi = {
    alma: "almaGabi",
    __proto__: gabi
}

console.log("Herencia de piernas: " + gabi.piernas)
console.log("Herencia de piernas: " + almaGabi.sabeLeer)