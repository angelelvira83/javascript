
function Logger(...args) {
    function log(...args) {
        console.log(...args)
    }

    function debug(...args) {
        console.log(...args)
    }

    return {
        log,
        debug,
    }
}
export default Logger()