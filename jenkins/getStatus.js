
// Para cambiar de repos, editar la variable repos

function getUrl(domain) {
    return `http://custom-jenkins2-jenkins2.apps.pro1.openshift.eci.geci/job/firefly-testing/job/${domain}/`
}
let buildsKafka = 'firefly-kafka-test-pdp firefly-kafka-test-plp firefly-kafka-test-conv firefly-kafka-test-core firefly-kafka-test-mixer firefly-kafka-test-rules firefly-kafka-test-sites firefly-kafka-test-stock firefly-kafka-test-center firefly-kafka-test-chkout firefly-kafka-test-orders firefly-kafka-test-parent firefly-kafka-test-pdp-v2 firefly-kafka-test-prices firefly-kafka-test-search firefly-kafka-test-catalog firefly-kafka-test-insuran firefly-kafka-test-payment firefly-kafka-test-schools firefly-kafka-test-category firefly-kafka-test-eventing firefly-kafka-test-analytics firefly-kafka-test-backoffice firefly-kafka-test-end-to-end firefly-kafka-test-promotions firefly-kafka-test-marketplace firefly-kafka-test-supermarket firefly-kafka-test-availability firefly-kafka-test-delivery-method firefly-kafka-test-shared-resources'
let reposKafka = buildsKafka.split(' ').map(getUrl)
let buildsAPI = 'firefly-api-test-core firefly-api-test-parent firefly-api-test-runner firefly-api-test-promotions firefly-api-test-stock-data firefly-api-test-bo-rule-api firefly-api-test-catalog-pim firefly-api-test-center-apisyn firefly-api-test-conv-data-api firefly-api-test-menu-launcher firefly-api-test-mkp-badge-api firefly-api-test-mkp-field-api firefly-api-test-plp-brand-api firefly-api-test-mkp-seller-api firefly-api-test-plp-search-api firefly-api-test-schools-apisyn firefly-api-test-bo-facet-apisyn firefly-api-test-conv-prices-api firefly-api-test-conv-stflow-api firefly-api-test-mkp-variant-api firefly-api-test-orders-oso-free firefly-api-test-bo-entity-apisyn firefly-api-test-cat-category-api firefly-api-test-pdp-business-api firefly-api-test-shared-resources firefly-api-test-bo-geozones-apisyn firefly-api-test-conv-cart-oms-free firefly-api-test-pdp-comparator-api firefly-api-test-plp-searcher-utils firefly-api-test-price-date-updater firefly-api-test-bo-product-type-api firefly-api-test-chkout-shipping-api firefly-api-test-expcomp-chkout-free firefly-api-test-mkp-mirakl-mock-api firefly-api-test-bo-exploded-tree-api firefly-api-test-bo-facet-link-apisyn firefly-api-test-conv-cohe-prices-api firefly-api-test-devops-test-data-api firefly-api-test-mkp-ean-relation-api firefly-api-test-mkp-product-type-api firefly-api-test-rules-assortment-api firefly-api-test-bo-groupexpert-apisyn firefly-api-test-chkout-oa-upsert-free firefly-api-test-bo-facet-attribute-api firefly-api-test-bo-site-subsite-apisyn firefly-api-test-bo-user-preference-api firefly-api-test-pdp-product-domain-api firefly-api-test-bo-category-rule-apisyn firefly-api-test-bo-spec-template-apisyn firefly-api-test-bo-admin-group-apisyn-v2 firefly-api-test-mkp-product-category-api firefly-api-test-mkp-product-relation-api firefly-api-test-orders-confirmation-free firefly-api-test-bo-payment-methods-apisyn firefly-api-test-orders-disponibility-free firefly-api-test-orders-orchestration-free firefly-api-test-payment-confirmation-free firefly-api-test-payment-restrictions-free firefly-api-test-bo-admin-group-type-apisyn firefly-api-test-bo-attribute-tree-node-api firefly-api-test-audit-catalog-dashboard-api firefly-api-test-center-sts-companies-apisyn firefly-api-test-virtual-center-super-apisyn firefly-api-test-bo-admin-group-folder-apisyn firefly-api-test-bo-attribute-translate-apisyn firefly-api-test-conv-stock-out-product-visible-api firefly-archetype-api-test firefly-api-test-bo-entity-type-apisyn firefly-api-test-bo-groupexpert-apisyn firefly-api-test-chkout-oa-upsert-free firefly-api-test-bo-facet-attribute-api firefly-api-test-bo-site-subsite-apisyn firefly-api-test-bo-user-preference-api firefly-api-test-pdp-product-domain-api firefly-api-test-bo-category-rule-apisyn firefly-api-test-bo-spec-template-apisyn firefly-api-test-bo-admin-group-apisyn-v2 firefly-api-test-mkp-product-category-api firefly-api-test-mkp-product-relation-api firefly-api-test-orders-confirmation-free firefly-api-test-bo-payment-methods-apisyn firefly-api-test-orders-disponibility-free firefly-api-test-orders-orchestration-free firefly-api-test-payment-confirmation-free firefly-api-test-payment-restrictions-free firefly-api-test-bo-admin-group-type-apisyn firefly-api-test-bo-attribute-tree-node-api firefly-api-test-audit-catalog-dashboard-api firefly-api-test-center-sts-companies-apisyn firefly-api-test-virtual-center-super-apisyn firefly-api-test-bo-admin-group-folder-apisyn firefly-api-test-bo-attribute-translate-apisyn firefly-api-test-conv-stock-out-product-visible-api firefly-archetype-api-test'
let reposAPI = buildsAPI.split(' ').map(getUrl)
let repos = reposAPI
async function getInfo(base) {
    let username = Deno.env.get('USUARIO')
    let password = Deno.env.get('PASSWORD')
    let credentialsB64 = btoa(`${username}:${password}`)
    let url = new URL(base)
    let path = 'job/develop/api/json'
    url.pathname += path
    let headers = new Headers({
        'Authorization': `Basic ${credentialsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    // console.log(url.href)
    let method = 'get'
    let response = await fetch(url.href, { headers, method })
    let json =  response.ok && await response.json()
    let text = !response.ok && await response.text()
    !response.ok && console.error(text)
    !response.ok && console.log(111111, json)
    return json || {
        lastBuild: {
            number: -1
        },
        lastStableBuild: {
            number: -2
        }}
}
Promise.all(repos.map(function(r) {
    let response = getInfo(r)
    return response
})).then(function(rr){
    return rr
}).then(function(r) {
    return r.filter(function(rrr = {}){
        let { lastBuild } = rrr
        let { lastStableBuild } = rrr
        return lastBuild && lastStableBuild && lastBuild.number !== lastStableBuild.number
    })
}).then(function(r) {
    let lastBuilds = r.map(s => s.lastBuild.url)
    console.log(`Los fallados son: ${JSON.stringify(lastBuilds, null, 2)}`)
})