/*
FALSY VALUES
- false
- undefined
- null
- 0
- NaN
- Cadena vacía ("")

REPO: https://github.com/denysdovhan/wtfjs

Evaluación perezosa: En lo que se basan muchos "returns de JOAN"
Si haces, por ejemplo, un return a && b, lo que hace es devolver "false" si 
a==false, o "b" si a==true

COERCION
a == b
--> Si son del mismo tipo, es igual que ===

*/

function decide (valor) {
    let decision = (valor > 100 ? "Super" : "Normal")
    console.log (decision)
}

decide (1)
decide (101)

console.log([] === ![])