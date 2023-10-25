import Fetch from '../../helpers/helper.fetch.js'

function removeParamsNullOrUndefined(params) {
    return Object.keys(params).reduce(function(acum, current) {
        let value = params[current]
        if(!isNullOrUndefined(value)) {
            acum[current] = value
        }
        return {...acum}
    }, {})
}

function isNullOrUndefined(value) {
    return value === null || value === undefined
}


function Jenkins({ Config, jobPath }) {
    let { jenkins } = Config

    let { auth } = jenkins
    let { base } = jenkins
  
    async function buildWithParameters({ delay = 0, jenkinsParams}) {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded' 
        })
        let body = new URLSearchParams({
            ...removeParamsNullOrUndefined(jenkinsParams)
        })
        let action = 'buildWithParameters'
        let jenkinsService   = Fetch({ base, auth, headers })
        let path = [jobPath, action].join('/')
        let params = {
            delay: `${delay}sec`
        }

         return jenkinsService.post({ path, params, body }).then(function (response) {
            jenkinsService.close()
            return response
        })
    }

    function getQueueInfo() {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded' 
        })
        let jenkinsService   = Fetch({ base, auth, headers })
        let path = '/queue/api/json'
        return jenkinsService.get({ path}).then(function (response) {
            jenkinsService.close()
            return response
        })
    }
    

    return {
        buildWithParameters,
        getQueueInfo
    }
}

export default Jenkins