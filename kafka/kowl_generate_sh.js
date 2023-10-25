
// Utilidad de generación de dockers para acceder a KOWL
// By @Joan Bosch, remastered by Ángel Elvira

// EJECUCIÓN: node kowl_generate_sh.js ave | bash -s start

function getEnvironment(env='ave') {
    const environment = {
        nft: {
            'schema_registry': 'http://cp-enterprise-schema-registry.paas.nft.eci.geci',
            'brokers': 'MXCPD10018D4073.eci.geci:9092'
        },
        ave: {
            'schema_registry': 'https://cp-enterprise-schema-registry.paas.ave.eci.geci',
            'brokers': 'kafka.ave.eci.geci:9092'
        },
        uat: {
            'schema_registry': 'https://cp-enterprise-schema-registry.paas.uat.eci.geci',
            'brokers': 'kafka.uat.eci.geci:9092'
        },
        esbx: {
            'schema_registry': 'https://cp-sr-ffsb6196.paas.ave.eci.geci',
            'brokers': 'kafka-ffsb6196.common-ffsb6196.svc:31532',
            'add_hosts': 'kafka-ffsb6196.common-ffsb6196.svc:10.251.63.71',
            'schema_registry_user': 'admin',
            'schema_registry_pass': 'admin',
        }
    }
    return {...environment[env], environment: env}
}

function getDomains(env) {
    let environment = getEnvironment(env)
    let domains = [
        {
            name: 'catalog',
            user: 'QF5-000',
            password: 'FIREFLY_QF5-000',
            port: 9000
        },
//        {
//            name: 'category',
//            user: 'QF4-000',
//            password: 'FIREFLY_QF4-000',
//            port: 9001
//        },
//        {
//            name: 'mixer',
//            user: 'QFB-000',
//            password: 'FIREFLY_QFB-000',
//            port: 9002
//        },
//        {
//            name: 'prices',
//            user: 'QFJ-000',
//            password: 'FIREFLY_QFJ-000',
//            port: 9003
//        },
//        {
//            name: 'promotions',
//            user: 'QFK-000',
//            password: 'FIREFLY_QFK-000',
//            port: 9004
//        },
//        {
//            name: 'rules',
//            user: 'QFH-000',
//            password: 'FIREFLY_QFH-000',
//            port: 9005
//        },
//        {
//            name: 'sites',
//            user: 'QFM-000',
//            password: 'FIREFLY_QFM-000',
//            port: 9006
//        },
//        {
//            name: 'searcher',
//            user: 'QFL-000',
//            password: 'FIREFLY_QFL-000',
//            port: 9007
//        },
//        {
//            name: 'bi-uat',
//            user: 'QFT-000',
//            password: 'FIREFLY_ANALYTICS_20210406',
//            port: 9008
//        },
//        {
//            name: 'bo',
//            user: 'QF2-000',
//            password: 'FIREFLY_QF2-000',
//            port: 9009
//        },
//        {
//            name: 'plp',
//            user: 'QFI-000',
//            password: 'FIREFLY_QFI-000',
//            port: 9010
//        },
//        {
//            name: 'pdp',
//            user: 'QFG-000',
//            password: 'FIREFLY_QFG-000',
//            port: 9011
//        },
//        {
//            name: 'stock',
//            user: 'QFN-000',
//            password: 'FIREFLY_QFN-000',
//            port: 9012
//        },
//        {
//            name: 'price',
//            user: 'QFJ-000',
//            password: 'FIREFLY_QFJ-000',
//            port: 9013
//        },
//        {
//            name: 'conv',
//            user: 'QFV-000',
//            password: {
//                nft: 'QFV-000',
//                ave: 'FIREFLY_QFV-000',
//                uat: 'FIREFLY_QFV-000'
//            }[env],
//            port: 9014
//        },
//        {
//            name: 'payment',
//            user: 'QN0-000',
//            password: {
//                nft: 'QN0-000',
//                ave: 'FIREFLY_QN0-000',
//                uat: 'FIREFLY_QN0-000'
//            }[env],
//            port: 9015
//        },
//        {
//            name: 'stflow',
//            user: 'QFS-000',
//            password: 'FIREFLY_QFS-000',
//            port: 9016
//        },
//        {
//            name: 'schools',
//            user: 'QFX-000',
//            password: 'FIREFLY_QFX-000',
//            port: 9017
//        },
//      {
//          name: 'orders',
//          user: 'QFD-000',
//          password: 'FIREFLY_QFD-000',
//          port: 9018
//      },
//        {
//            name: 'RefactorMKP',
//            user: 'admin',
//            password: 'admin',
//            port: 9115
//        },
    ].map(function(d) {
        return {...d, ...environment, nameContainer: `kowl-${d.name}`}
    })

    return domains;

}


function initBash() {
    return `
#!/bin/bash
trap ctrl_c INT

function ctrl_c() {
    end="true"
    stop
}`
}


// Schema regsitry user client/client normal, admin/admin for esbx
function dockerStart({nameContainer, port, brokers, user, password, schema_registry, environment, add_hosts, schema_registry_user, schema_registry_pass}) {
    schema_registry_user = schema_registry_user || 'client'
    schema_registry_pass = schema_registry_pass || 'client'
    let command = `echo 'The container ${nameContainer} on environment: ${environment} is run on http://localhost:${port}'
    docker run --name ${nameContainer} --rm -p ${port}:8080 \
    ${add_hosts ? '--add-host ' + add_hosts : ''} \
    -e KAFKA_BROKERS="${brokers}" \
    -e KAFKA_TLS_ENABLED=true \
    -e KAFKA_TLS_INSECURESKIPTLSVERIFY=true \
    -e KAFKA_SASL_ENABLED=true \
    -e KAFKA_SASL_USERNAME=${user} \
    -e KAFKA_SASL_PASSWORD=${password} \
    -e KAFKA_SASL_MECHANISM=SCRAM-SHA-512 \
    -e KAFKA_SCHEMAREGISTRY_ENABLED=true \
    -e KAFKA_SCHEMAREGISTRY_URLS="${schema_registry}" \
    -e KAFKA_SCHEMAREGISTRY_TLS_ENABLED=true \
    -e KAFKA_SCHEMAREGISTRY_TLS_INSECURESKIPTLSVERIFY=true \
    -e KAFKA_SCHEMAREGISTRY_USERNAME="${schema_registry_user}" \
    -e KAFKA_SCHEMAREGISTRY_PASSWORD="${schema_registry_pass}" \
    -e KAFKA_LOGGER_LEVEL=debug \
    docker.redpanda.com/vectorized/console:latest`


    return command;
}

function dockerStop({nameContainer}) {
    let command = `docker stop ${nameContainer}`

    return command;
}

function StartScript(containers, deploy) {
    let command = `function start() {
        ${containers.map(container => dockerStart(container)).join('\n\n')}
        ${deploy()}
    }`

    return command;
}

function StopScript(containers) {
    let command = `
    function stop() {
        ${containers.map(c => dockerStop(c)).join('\n\n')}
    }`

    return command;
}


function executeScript() {
    let command = `action=$1

    if [ $# -lt 1 ] 
    then
        echo 'Error: Debes pasar una acción start/stop'
        exit -1
    fi
    end="false"
    port_deploy=$2
    if [ -z $2 ]
    then
        port_deploy=9898
fi
    action=$1
    echo Ejecutando $action
    $action
    `
    return command
}

function print(printCommands) {
    return printCommands.join('\n')
}

function html(containers) {
    let result =[]
    let env = containers[0].environment;
    result.push('<html>')
    result.push('<head>')
    result.push('<title>All domains</title>')
    result.push('</head>')
    result.push('<body>')
    result.push(`<p>The environment is ${env}</p>`)
    result.push('<ul>')
    result = result.concat(containers.map(c => `<li><a target="_blank" href="http://localhost:${c.port}">${c.name}</a></li>`))
    result.push('</ul>')
    result.push('</body>')
    result.push('</html>')

    return result.join('\n')
}

function deployHTML(html) {
    let command = `echo "Server web on http://localhost:\${port_deploy}"
    html=\`cat <<EOF
    ${html}
EOF\`
while [ $end == "false" ]; do echo -e "HTTP/1.0 200 OK\\nContent-Type: text/html\\nContent-Length: \${#html}\\n\\n\${html}" | nc -l -p \${port_deploy}; done`

    return command
}

!function() {
    let env = process.argv[2]
    let containers = getDomains(env)
    console.log(print([
        initBash(),
        StartScript(containers, ()=> deployHTML(html(containers))),
        StopScript(containers),
        executeScript()
    ]))
}()

