import Array from './helper.arrays.js'

const REGEX_PD = /PD[0-9]{1,}-[0-9]{1,}/g
const AT = '@'

const isString = s => typeof s === typeof ''

function extractPds(string) {
    return string.match(REGEX_PD)
}

function pdsWithMark(pds) {
    return pds.map(t => `${AT}${t}`).join(',')
}

function pdsWithMarkKatalon(pds) {
    return pds.map(t => `${AT}${t}`).join(' or ')
}

function format(pds) {
    let pdsToCommand = pdsWithMark(pds)
    return pdsToCommand ? `--tags ${pdsToCommand} --tags ~@ignore` : ''
}

function formatKatalon(pds) {
    let pdsToCommand = pdsWithMarkKatalon(pds)
    return pdsToCommand ? `${pdsToCommand} not @ignore` : '' 
}

function getPds(tests) {
    tests = isString(tests) ? tests : tests.join()
    let pds = extractPds(tests)
    pds = pds || []
    let pdsUniq = Array.uniq (pds)
    return pdsUniq
}


function Cucumber({ tests }) {

  
    function optionsCommand() {  
        return format(getPds(tests))
    }

    function optionsCommandKatalon() {
        return formatKatalon(getPds(tests))
    }

    function get() {
        return getPds(tests)
    }

    return {
        optionsCommand,
        optionsCommandKatalon,
        get
    }
}

export default Cucumber