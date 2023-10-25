// Estado de la indexación
// By @Joan Bosch

// Ejecución: deno run -A --unstable indexacion.js

function getUrlIndex({env, site}) {
}
    return new URL(`http://qbu-indexer-producer.${env}.eci.geci/indexer/v1/sites/${site}`)
}
function log(...args) {
    console.log('\n')
    console.log(...args)
}
function error(...args) {
    console.log('\n')
    console.error(...args)
}
async function evaluateTotalIndex(u) {
    let url = new URL(u)
    let response = await fetch(url.href)
    try {
        let json = await response.json()
        let { status } = json
        let {lastUpdate} = json
        let date = new Date(lastUpdate)
        if(status === 'ENDED') {
            log(`The last index on ${url.href} is ok at ${date}`)
        }
        else {
            error(`The last index on ${url.href} is ko at ${date}`)
            error(JSON.stringify(json, null, 2))
        }
    }
    catch(e) {
        error(`Error in ${url.href} : \n ${e}`)
    }
}
let urls = [
    {
        env: 'NFT',
        site: 'firefly-hipercorstore_es',
    },
    {
        env: 'NFT',
        site: 'firefly-ecistore_es',
    },
    {
        env: 'UAT',
        site: 'firefly-hipercorstore_es',
    },
    {
        env: 'UAT',
        site: 'firefly-ecistore_es',
    },
].map(getUrlIndex)
await Promise.all(urls.map(evaluateTotalIndex))