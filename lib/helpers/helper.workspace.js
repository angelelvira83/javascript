import Logger from './helper.logger.js'

function WS({ key }) {
    let memory = {}
    memory[key] = {}

    function save(path, result ) {
        memory[key][path] = result
    }

    function get( path ) {
        return memory[key][path]
    }

    function toString() {
        return JSON.stringify(memory, null, 2)
    }

    return {
        save,
        get,
        toString
    }
}

export default WS