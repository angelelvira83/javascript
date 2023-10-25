function getTraceMavenTest(string) {
    return string.match(/Maven test process [^ ]{1,} finished in [^ ]{1,} seconds/g) || []
}
function getTraceTrazability(string) {
    return string.match(/Trazability and zip process on [^ ]{1,} finished in [^ ]{1,} seconds/g) || []
}
function getTraceInfoScenario(string) {
    return string.match(/[0-9]{1,}[/][0-9]{1,}[/][0-9]{1,} [0-9]{1,}:[0-9]{1,}:[0-9]{1,} INFO log.TestingLogger: Log infoScenario at [^\n]{0,}[\n]/g) || []
}

function getTest(string) {
    return string.match(/Skipping JaCoCo execution due to missing classes directory) || []
}




//Error executing test forfunction getTraceInfoScenarioKO(string) {
//    return string.match(/Error executing test for[^\n]{0,}[\n]/g) || []
//}
function getResult(scenarios) {
   scenarios.forEach(function(t) {
       console.log(t)
   })
}
function getCurrentUrlJenkins() {
    let url = new URL(window.location.href.match(/.+([0-9]{1,}\/)/)[0])
    url.hash = new Date().getTime()
    url.pathname += 'consoleText'
    return url
    }

async function getJenkinsConsoleText() {
    let url = getCurrentUrlJenkins()
    let text = await fetch(url.href).then(r => r.text())
    return text;
}

async function getSummaryFromConsoleText() {
    let text = await getJenkinsConsoleText()
    let scenarios = [
    ...getTest(text),
    //...getTraceTrazability(text),
//     ...getTraceInfoScenarioKO(text),    ...getTraceInfoScenario(text)
    ]
    return getResult(scenarios)
}
async function main() {
 await getSummaryFromConsoleText()
}
main()