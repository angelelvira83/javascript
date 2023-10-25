import Fetch  from '../../helpers/helper.fetch.js'
const EXECUTESEARCH = '/rest/zapi/latest/zql/executeSearch'
const OFFSET = 0
const MAXRECORDS = 2000
const EMPTY = ''
const EXECUTIONS = 'executions'

function Zephyr({ Config, Data }) {
    async function get({key, filterTests, environment}) {
        filterTests         = filterTests || []
        let Tests           = Data({
            environment,
        })
        let { query }       = Tests.tests.get(key)
        let response        = await fetch(query)
        let tests           = await getTests(response)
    
        return tests.filter(filterFn(filterTests))
    }
    
    function fetch(query) {
        let { proxy }       = Config
        let { jira }        = Config
        let { auth }        = jira
        let { base }        = jira
        let zephyrService   = Fetch({ base, proxy, auth })
        let path            = EXECUTESEARCH
        let params          = {
            filterId    : EMPTY,
            offset      : OFFSET,
            maxRecords  : MAXRECORDS,
            expand      : EMPTY,
            zqlQuery    : query
        }
        return zephyrService.get({ path, params }).then(function (response) {
            zephyrService.close()
            return response
        })
    }
    
    async function getTests(response) {
        let json = await response.json()
        let tests = json[EXECUTIONS].map(getTestID)
        return tests
    }
    
    function filterFn(filterTests) {
        return function(testID) {
            return !filterTests.includes(testID)
        }
    }
    
    function getTestID(execution) {
        return execution.issueKey
    }
    return {
        get
    }    
}

export default Zephyr