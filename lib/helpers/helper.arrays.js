const DEFAULT_SIZE_PART = Infinity
const ONE = 1
function Arrays() {
    
    function uniq(arr) {
        return Object.values(arr.reduce(function(ac, c){
            ac[c] = c
            return ac
        }, {}))
    }

    function packs(array, sizePart) {
        sizePart = sizePart || DEFAULT_SIZE_PART
        let sizeOriginalArray = array.length
        let parts = sizeOriginalArray > sizePart ? (sizeOriginalArray / sizePart) : ONE
    
        return Array.from({length: Math.ceil(parts)}).map((_, i) => array.slice(i * sizePart, (i+ ONE) * sizePart))
    
    }

    return {
        uniq,
        packs
    }
}

export default Arrays()