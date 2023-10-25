// deno run --unsafely-ignore-certificate-errors -A ./test.js

import Token from './token.js'
const {getToken} = Token

async function test() {
    let tokenResponse = await getToken('ave')
    let { token } = tokenResponse
    let {bearer} = tokenResponse
    console.log(111, bearer)
    let headers = {
        'Authorization': `Bearer ${bearer}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection' : 'Keep-Alive'
     }



    let url = "https://wso2-apigw-ext.paas.uat.eci.geci:443/products/backoffice-entity-types/v1/entity-types?page=-1"

    //let url = "https://wso2-apigw-ext.paas.nft.eci.geci:443/products/backoffice-entities/v1/entities?page=0&size=20"

    //let url = "http://bo-entity-type-apisyn.ave.eci.geci/entity-types?page_size=-1"
    let requests = Array.from({length: 100}).map(async function(){
         let response = await fetch(url, {method: 'get', headers})
         let ok = response.ok
         let status = response.status
         let json = (ok && await response.json()) || {}
         console.log(`Response: ${ok}, ${status}`)
         return {status, ok, json}

    })

let resultOk = await Promise.all(requests).then(r => r.filter(c=> (c.status === 400)))
let resultKO = await Promise.all(requests).then(r => r.filter(c=> (c.status !== 400 )))

console.log(`ResultOk hay ${resultOk.length} y ResultKo hay ${resultKO.length}`)
}

test()