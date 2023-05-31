//

function test(obj) {
    for (let i in obj) console.log(obj[i])
}

test({"uno": "a", "dos":"b", "tres":3})


// Clousure
// funciones que usan variables definidas fuera de su contexto


const pruebaGranObjeto =  {
    "cadenaGran": "cadenita",
    "numeroGran": 1,
    "function": function(a,b) {return a*b},
}



console.log(pruebaGranObjeto.function(1,2))


var descuentos = {
    novide: 0.4,
    pro: 0.2
}

var descuentos2 = {
    novide: 1.4,
    pro: 1.2
}

var discounter = function (clientType, tariff) {
    return this[clientType] * tariff
}

// Toda función tiene el método "call", en el que el primer argumento es THIS y el resto los que quieras
console.log(discounter.call(descuentos2, "novide", 100))

// Lo mismo pero con lista de argumentos

function test(...arguments){
    console.log(this.num, arguments);//100, [1,2,3]
  }
  
test.apply({num: 100}, [1,2,3])

// Si lo llamas creas una segunda función en la que el THIS ya va siempre incluido, hasta que hagas el unbind
var discounterByProfile = discounter.bind(descuentos)


//console.log(discounterByProfile("novide", 100))


// Objecto con getter y setter básico

const modulo = (function(){
     function metodoPrivado () {
     }
     let valorPrivado = "algo"
     return function() {
       return {
         get: function() { return valorPrivado},
         set: function(v) { valorPrivado = v }
       }
    }
    })()
    
    var x = modulo()
    console.log("Primer get: " + x.get())
    x.set("Otro valor")
    console.log("Segundo get: " + x.get())
    x.valorPrivado //Undefined



var Salute = (function (){

    // Esta función es nuestro constructor
    function Salute(lang){
        this._lang = lang;
    }

    // Este es nuestro método privado
    function Hi(){
        if(this._lang == "en"){
            console.log('Hi, I am a private method');
        }else if(this._lang == "es"){
            console.log('Hola, Yo soy un método privado');
        }
    }

    // Este es nuestro método público
    Salute.prototype.sayHi = function () {
        return Hi.call(this);
    }

    return Salute;

})();

var salute_es = new Salute('es');

//salute_es.Hi(); 
// La consola nos mostrará que Hi(); 
// no es una función válida

salute_es.sayHi();  
// Nos saldrá un alert con el texto 
// 'Hola, Yo soy un método privado'

