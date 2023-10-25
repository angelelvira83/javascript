import Token from './token.js'
const {getToken} = Token
async function test() {
    let tokenResponse = await getToken('ave')
    let { token } = tokenResponse
    console.log(token)
    let {bearer} = tokenResponse
    console.log(111, bearer)
    let headers = {
        'Authorization': `Bearer ${bearer}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection' : 'Keep-Alive'
     }
     //let url = "https://wso2-apigw-ext.paas.uat.eci.geci/products/backoffice-admin-group-types/v1/types"
     //let url = "https://wso2-apigw.uat.eci.geci:8243/products/backoffice-admin-group-folders/v1/admin-group-folders/b4ac7e44-5c03-435d-b941-ba6e1a0b97ce"
    let url = "https://wso2-apigw-ext.paas.uat.eci.geci:443/products/backoffice-entity-types/v1/entity-types?page=-1"
    //let url = "https://wso2-apigw-ext.paas.nft.eci.geci/products/ecommerce-search/v1/products?site=eciStore&question=A28305320%20A30053553%20A34380771&Size=3&subsite=eciStore_MercanciaGeneral&sort=bestSellerQtyDesc"
    let requests = Array.from({length: 50}).map(async function(){
        //  let tokenResponse = await getToken('ave')
        //  let { token } = tokenResponse
        //  console.log(token)
        //  let bearer = {tokenResponse}
         let headers = {
            'Authorization': `Bearer ${bearer}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Connection' : 'Keep-Alive'
         }
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

function test2() {
    Array.from({length: 50}).map(async function(){
        let tokenResponse = await getToken('uat')
        let { token } = tokenResponse
        console.log(token)
    })

}

async function testEnvironment(env) {
    let tokenResponse = await getToken(env)
    console.log(444, tokenResponse)
}

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