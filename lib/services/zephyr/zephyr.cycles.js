import Fetch  from '../../helpers/helper.fetch.js'
import Time from '../../helpers/helper.time.js'
const CYCLE = '/rest/zapi/latest/cycle'
const EMPTY = ''
const DEFAULTPROJECTID = '16430'

function Zephyr({Config, Data}) {
  async function getAllCycles() {
    let response = await fetch()
    let body = await getBody(response)
    let allCycles = getCycles(body)
    return allCycles
  }
  
  async function getBody(response) {
    if(!response.ok) {
      console.log(await response.text())
      throw new Error('Problem with jira')
    }
    let json = await response.json()
    return Object.values(json)[0][0]
  }
  
  function getCycles(body) {
    let isIndex = n => parseInt(n)
    return Object.keys(body).filter(isIndex).map(function(id){
      let o = body[id]
      o.cycleId = id
      return o
    })
  }
  
  function fetch() {
    let { proxy }         = Config
    let { jira }          = Config
    let { auth }          = jira
    let { base }          = jira
    let { projectId }     = jira
    let zephyrService     = Fetch({ base, proxy, auth })
    let path              = CYCLE
    let params = {
      projectId: projectId || DEFAULTPROJECTID,
      versionId: EMPTY,
      id: EMPTY,
      offset: EMPTY,
      issueId: EMPTY,
      expand: EMPTY,
  }
   
    return zephyrService.get({ path, params }).then(function (response) {
        zephyrService.close()
        return response
    })
  }
  
  function createCycleOnZephyr({name, environment, description, projectId}) {
    projectId = projectId || DEFAULTPROJECTID
    let { proxy }           = Config
    let { jira }            = Config
    let { auth }            = jira
    let { base }            = jira
    let headers = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    let zephyrService   = Fetch({ base, proxy, ...headers, auth })
    let path            = CYCLE
    let params = {
      name,
      build: "",
      environment,
      description,
      startDate: "",
      endDate: "",
      projectId,
      versionId: "-1",
    }
    let body = JSON.stringify(params)
    return zephyrService.post({ path, body }).then(async function (r) {
        zephyrService.close()
        let response = await r
        let { ok } = response
        let json
        if(ok) {
          json = await response.json()
        }
        else {
          json = await response.text()
        }
        return {
          json,
          name,
          environment,
          description,
          id: json.id
        }
    })
  }
  
  function includesAll({string = '', array, isIgnoreCase = false}) {
    string = isIgnoreCase ? string.toLowerCase() : string
    return array.length && array.reduce(function(acum, current){
      current = "" + current
      current = isIgnoreCase ? current.toLowerCase() : current
      return acum && string.includes(current)
    }, true)
  }
  
  function filterCycles(cycles, fnFilter) {
    return cycles.filter(fnFilter)
  }
  
  function searchCycleByCriteria(criteriaNameFilter ) {
    return function(cycle) {
      let { name } = cycle
      return includesAll({
        string: name, 
        array: criteriaNameFilter, 
        isIgnoreCase: true,
      })
    }
  }
  
  async function get({ key, date, environment }) {
    let ymdTime = Time.formatYMD( {date} )
    let allCycles = await getAllCycles()
    let data = Data({environment})
    let configCycle = data.cycles.get(key)
    let { criteriaNameFilter } = configCycle
    criteriaNameFilter = date ? [...criteriaNameFilter, ymdTime] : criteriaNameFilter
    let criteria = searchCycleByCriteria(criteriaNameFilter)
    let cycles = filterCycles(allCycles, criteria)
    let cycle = cycles[0]
    return {
      cycles,
      cycle,
    }
  }
  
  function getNameCycle(name, fdate) {
    return fdate ? name.replace('$MARK', fdate) : name.replace('$MARK ', '')
  }


  
  async function create({ key, date, environment, projectId }) {
    let ymdTime = Time.formatYMD( {date} )
    let data = Data({environment})
    let configCycle = data.cycles.get(key)
    let { name } = configCycle
    let { description } = configCycle
    let cycleName = date ? getNameCycle(name, ymdTime) : getNameCycle(name, '')
   

    let newCycle = await createCycleOnZephyr({
      name: cycleName,
      environment, 
      description,
      projectId
    })
    return newCycle
  }

  async function createAndGetCycle({ key, date, environment, projectId }) {
    let cycles = await get({key, date, environment})
    if(!cycles.cycle) {
      await create({ key, date, environment, projectId })
      cycles = await get({key, date, environment})
    }
    return cycles
  }
  
  function remove(id) {
    let { proxy }       = Config
    let { jira }        = Config
    let { auth }        = jira
    let { base }        = jira
    let zephyrService   = Fetch({ base, proxy, auth })
    let path            = [CYCLE, id].join('/')
    return zephyrService.delete({ path }).then(async function (response) {
      zephyrService.close()
      let {ok} = response
      let json = await response.json()
      return {
        ok,
        json
      }
    })
  }

  return {
    create,
    createAndGetCycle,
    get,
    remove,
    getAllCycles,
  }
}

export default Zephyr