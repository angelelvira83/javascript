import Logger from './helper.logger.js'

function show({msg, skip, yes}) {
    let result
    if(skip) {
        Logger.log(msg)
        result = yes
    }
    else {
        result = prompt(msg)
    }
    
    return result
}

async function decision({action, yes, msg, skip }) {
    skip = !!skip
    yes = yes || 'y'
    let yesNo = `si=${yes},no=cualquier otra cosa`
    let msgDefault = `¿Qué quieres hacer?`
    msg = msg || msgDefault
    msg = `${msg}(${yesNo})`

    let answer = show({msg, skip, yes})

    if(answer === yes) {
        console.log('has elegido si')
        await action()
    }
    else {
        console.log('has elegido no y no ejecuto la acción')
    }

}

if(import.meta.main) {
    decision({
        action: () => console.log('accion')
    })
}

export default decision