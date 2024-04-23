

let watchTimer = 0;
const printButton = document.querySelector('a.js-print-badge[data-title="Print badge"]')

if(printButton) {
    printButton.addEventListener('click', () => startWatcher())
}

function startWatcher() {
    stopWatcher()

    watchTimer = setInterval(()=>{
        const templateSelect = document.querySelector("select#template");

        if(templateSelect) {
            stopWatcher();
            console.log(`Set template to paper...`);
            templateSelect.value = '439';
        }

    }, 250)

    console.log(`Wait for template selector...`, watchTimer);
}

function stopWatcher() {
    if(watchTimer) {
        console.log(`Stop waiting for template selector...`, watchTimer);
        clearInterval(watchTimer);
    }

    watchTimer = 0;
}


console.log("Indico chrome extension by SCBD loaded!")
