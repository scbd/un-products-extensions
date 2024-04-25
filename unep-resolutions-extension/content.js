
function formatDate(rawDate) {
    const date = new Date(rawDate.replace(/- \d+:\d+$/, 'UTC')); //fake UTC so date do not shift because of the tz
    const year = date.getUTCFullYear();
    const month = `${date.getUTCMonth()+1}`.padStart(2, '0'); //Month start a 0
    const day = `${date.getUTCDate()}`.padStart(2, '0');
    return `${day}/${month}/${year}`;
}

function htmlEncode(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

async function copyToClipboatd(el) {
    const type = "text/html";
    const blob = new Blob([el.outerHTML], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    await navigator.clipboard.write(data);
}

function elementFromBlock(e) {
    const organization = e.querySelector('.field-name-field-countrys     > .field-items')?.innerText ||
                         e.querySelector('.field-name-field-organization > .field-items')?.innerText;

    const group   = e.querySelector('.field-name-field-group-of-states  > .field-items')?.innerText || 
                    e.querySelector('.field-name-field-group-of-organizations  > .field-items')?.innerText;

    const agenda  = e.querySelector('.field-name-field-category         > .field-items')?.innerText ||
                    e.querySelector('.field-name-field-filecategory     > .field-items')?.innerText;

    const desc    = e.querySelector('.field-name-field-descriptionfield > .field-items')?.innerText || 
                    e.querySelector('.field-name-field-description      > .field-items')?.innerText;

    const date    = e.querySelector('.field-name-field-uploaddate       > .field-items')?.innerText;

    const anchor  = e.querySelector('.field-name-field-attach           > .field-items a') ||
                    e.querySelector('.field-name-field-upload-a-file    > .field-items a') ||
                    e.querySelector('.field-type-file                   > .field-items a')

    const link     = anchor?.href;
    const filename = anchor?.innerText;

    const isStatement = window.location.href.includes('statements');

    const div = document.createElement('div');

    if(isStatement) {
        const encoded_Date = htmlEncode(formatDate(date));
        let encoded_Name = htmlEncode(group || organization);
        
        if(group && organization)
            encoded_Name = htmlEncode(`${organization} on behalf of ${group}`);

        const encoded_Link = `<a href="${link}" rel="noopener" target="_blank">${encoded_Name}</a>`;
    
        div.innerHTML = [encoded_Date, encoded_Link].join(' &nbsp;|&nbsp; ');
    }
    else
    {
        const encoded_Date = htmlEncode(formatDate(date));
        let encoded_Name = htmlEncode(group || organization);

        if(group && organization)
            encoded_Name = htmlEncode(`${organization} on behalf of ${group}`);


        const encoded_Link = `<a href="${link}" rel="noopener" target="_blank">${htmlEncode(desc || agenda || filename)}</a>`;
    
        div.innerHTML = [encoded_Date, encoded_Name, encoded_Link].join(' &nbsp;|&nbsp; ');
    }

    return div;
}

//Add copy button
document.querySelectorAll('div[about].comment').forEach(e => {

    const copyButton = document.createElement('button');
    copyButton.className = "copy";
    copyButton.innerText = "Copy";
    copyButton.style.float = 'right';

    copyButton.addEventListener('click', async () => {
        const div = elementFromBlock(e);
        await copyToClipboatd(div);
        copyButton.innerText = "Copied!";
        setTimeout(() => copyButton.innerText = "Copy", 1000);
    })

    e.appendChild(document.createElement('hr'))
    e.appendChild(copyButton, e.firstChild);
    e.appendChild(elementFromBlock(e));
});

