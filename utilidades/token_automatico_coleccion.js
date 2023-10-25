/*

Para que las llamadas a APIs de una colección actualicen de forma automática el token
Se mete este código en "script de prerrequisitos" dentro de la configuración de la colección
Dentro de esa configuración, en la pestaña autenticación, se pone "bearer" y {{jwt}}

Se tiene que actualizar la URL de IDP, ID/Secret

*/

pm.variables.clear();

const moment = require('moment')

const getJWT = {
    url: 'https://wso2-idp.uat.eci.geci:9443/oauth2/token',
    method: 'POST',
    header: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {
        mode: 'urlencoded',
        urlencoded: [
            {key: 'grant_type', value: 'client_credentials'},
           // {key: 'scope', value: pm.environment.get('scope')},
            {key: 'client_id', value: 'QlmafP051Lfdm6TjUIJG2ajdYbEa'},
            {key: 'client_secret', value:'LtHnLv6mLeMJSND7pXUAmXrQ2hYa'}
        ]
    }
}

var getToken = true
if (!_.has(pm.environment.toObject(), 'AccessTokenExpiry')
    || !_.has(pm.environment.toObject(), 'jwt')
    || pm.environment.get('AccessTokenExpiry') <= moment().valueOf()) {
} else {
    getToken = false
}

if (getToken) {
    pm.sendRequest(getJWT, (err, res) => {
        if (err === null) {
            pm.environment.set('jwt', res.json().access_token)
            var expiryDate = moment().add(res.json().expires_in, 's').valueOf()
            pm.environment.set('AccessTokenExpiry', expiryDate)
        }
    })
}