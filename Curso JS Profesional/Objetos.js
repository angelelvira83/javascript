var objectoProperties = {
    _valorCadena: "cadena", // Si la queremos interna, por convenio es así
    "valorNumero": 1,
  //  writable: false, // Prop Interna de cada propierdad, por defecto true
  //  enumerable: false, // Prop Interna de cada propierdad, por defecto true
  //  configurable: false // Prop Interna de cada propierdad, por defecto true
}

Object.defineProperty(objectoProperties, '_valorCadena', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: 'cadena'
  });

Object.defineProperty(objectoProperties, 'valorNumero', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: 1
});

// Te dice si tiene una propiedad específica
console.log("Tiene propiedad número?: " + objectoProperties.hasOwnProperty('valorNumero'))

// No se pueden listar las propiedades
console.log("Listado propiedades: " + Object.keys(objectoProperties))

//No se puede borrar
delete objectoProperties._valorCadena
console.log("Tiene propiedad cadena?: " + objectoProperties.hasOwnProperty('_valorCadena:'))

// No se puede modificar
objectoProperties._valorCadena = "KKK"
console.log("Cuando vale cadena?: " + objectoProperties._valorCadena)


// Patrón factoría - Devuelve ya el objeto

// Constructor
function createActor (name, speed, strength) {
    // Nuevo objecto
    var obj = new Object();

    // Instanciamos sus propiedades
    obj.name = name;
    obj.speed = speed;
    objectoProperties.strength = strength;

    // Método
    obj.salute = function() {
        console.log("Saludamos a: " + obj.name)
    }

    // Retorno
    return obj;
}

var luisTosar = createActor("Luis Tosar", "Velocidad media", "Muy bueno")
luisTosar.salute()



// Patrón Constructor - Se invoca con New

// Constructor
function Actor (name, speed, strength) {
    // Instanciamos sus propiedades
    this.name = name;
    this.speed = speed;
    this.strength = strength;

    // Método
    this.salute = function() {
        console.log("Saludamos a: " + this.name)
    }
}

var tomHanks = new Actor("Tom Hanks", "Velocidad lenta", "Extraordinario")
tomHanks.salute()




let respuesta = "Siempre va bien";

if (respuesta === "Siempre va bien") {
    let premio =  2000;
} else {
    premio = 0
}

console.log(premio);