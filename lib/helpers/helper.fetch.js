function getAgentProxy({username, password, host, port, protocol}) {
    let url = `${protocol}://${host}:${port}`
    let client = host ? Deno.createHttpClient({
        proxy: {
          url,
          basicAuth: {
            username,
            password
          }
        }
    }) : null
    return {
        client
    }
}


function Fetch({ base, proxy = {}, headers={}, auth ={} }) {
    let {client} = getAgentProxy(proxy)

    function encondeParams(params={}) {
        let result = []
        Object.keys(params).forEach(key => {
            result.push(`${key}=${params[key]}`) 
        })

        return result.join('&')
    }

    function Url({path, params, auth}) {
        let url         = new URL(base)
        url.pathname    = path
        url.search      = encondeParams(params)
        url.username    = auth.username || ''
        url.password    = auth.password || ''
        return url
    }

    function request(url, opts) {
        return fetch(url, {
            headers,
            client,
            ...opts
        })
    }

    function get({path, params}) {
        let url = Url({path, params, auth})
        return request(url.href, {
            method: 'GET'
        })
    }

    function post({path, params, body}) {
        let url = Url({path, params, auth})
        return request(url.href, {
            method: 'POST',
            body,
        })
    }

    function remove({path, params}) {
        let url = Url({path, params, auth})
        return request(url.href, {
            method: 'DELETE'
        })
    }

    function close() {
        return client && client.close()
    }

    function getBase() {
        return base
    }

    return {
        get,
        post,
        delete: remove,
        close,
        getBase
    }
}

export default Fetch