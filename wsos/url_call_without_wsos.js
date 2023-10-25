// Utilidad de lanza "n" peticiones contra la url que pongas (length)
// By @Joan Bosch.

// EJECUCIÓN: deno run builds.js

async function withOutWSO2() {
    let url = 'http://bo-entity-type-apisyn.ave.eci.geci/entity-types?page_size=-1'
    let responses = await Promise.all(Array.from({length: 50}).map(async function() {
        let response = await fetch(url)
        let ok = response.ok
        let status = response.status
        return {
            ok,
            status
        }
    }))
    let resultOk = responses.filter(c=> (c.status === 401))
    let resultKO = responses.filter(c=> (c.status !== 401 ))
    console.log(`ResultOk hay ${resultOk.length} y ResultKo hay ${resultKO.length}`)
}
withOutWSO2()