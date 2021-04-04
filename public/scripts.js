function createTable(json) {
    if (json == null || json.length === 0) return;
    
    let table = document.createElement('table');
    let tableHead = document.createElement('thead');

    console.log(Object.keys(json));

    /*for (let key of json) {
        console.log(json[key]);
    }*/


    table.setAttribute("class", "table is-bordered");
}

async function windowActions() {
    console.log('page loaded');
    
    const request = await fetch('/api/meals');
    const json = await request.json();

    let jsonobj = json;
    console.table(jsonobj);

    createTable(jsonobj);
}

window.onload = windowActions;