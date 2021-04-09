function createTable(json) {
    if (json == null || json.length === 0) return;

    function createTableHead(table) {
        let tableHead = table.createTHead();
        let row = tableHead.insertRow();

        for (key in json['data'][0]) {
            //Going to each dining hall's specific property
            let th = document.createElement('th');
            let label = document.createTextNode(key);
            th.appendChild(label);
            row.appendChild(th);
        }
        console.log('done making table head');
    }

    function createTableBody(table) {
        for (key in json['data']) {
            let row = table.insertRow();
            for (key2 in json['data'][key]) {
                let cell = row.insertCell();
                let text = document.createTextNode(json['data'][key][key2]);
                cell.appendChild(text);
            }
        }
        console.log('done making table body');
    }

    //console.log(json['data'][0]['hall_id'])
    let table = document.createElement('table');
    createTableHead(table);
    createTableBody(table);
    table.setAttribute("class", "table is-bordered");
}

async function windowActions() {
    console.log('page loaded');
    
    const request = await fetch('/api/dining');
    const json = await request.json();

    let jsonobj = json;

    createTable(jsonobj);
    console.log('done everything');
}

window.onload = windowActions;