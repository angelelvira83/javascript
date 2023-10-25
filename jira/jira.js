import Fetch from '../lib/helpers/helper.fetch.js'
import Logger from '../lib/helpers/helper.logger.js'

let issue = Deno.args[0] //'PD00000650-648'

let base = 'https://jira.almeci.io'
let auth = {
    username: 'X47450EL',
    password: 'Gelque28'
    }

let service = Fetch({
    base,
    auth})

let response = await service.get({
    path: `/rest/api/2/issue/${issue}`,
})

let json = await response.json()

function recolect(json) {
    let {fields} = json
    let {issuetype} = fields
    let {name} = issuetype
    let {priority} = fields
    let {labels} = fields
    let entorno = fields['customfield_18000']
    let team = fields['customfield_17500']
    let assignee = fields.assignee || ''
    let { project } = fields
    let {fixVersions} = fields
    return {
        name,
        priority,
        labels,
        entorno,
        team,
        assignee,
        project,
        fixVersions    }
}

Logger.log(recolect(json))