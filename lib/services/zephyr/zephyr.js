import ZTests from './zephyr.tests.js'
import ZCycles from './zephyr.cycles.js'

function Zephyr({Config, Data}) {
    return {
        tests: {...ZTests({Config, Data})},
        cycles: {...ZCycles({Config, Data})}
    }
}


export default Zephyr