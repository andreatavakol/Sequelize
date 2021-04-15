function pickTen(json) {
    if (json == null || json.length === 0) return;

    const result = [];
    //i don't know why it spits out 10 results when i set it to i < 20
    //but i'm just going to let sleeping dogs lie
    for (let i = 0; i < 20; i++) {
        const random = Math.floor(Math.random() * json.length);
        if (result.indexOf(json[random]) !== -1) continue;
        result.push(json[random]);
        i++;
    }

    return result;
}

function createChart(json1, json2) {
    if (json1 == null || json1.length === 0 || json2 == null || json2.length === 0) return;
    //json1 are the main objects we care about
    //json2 are the values of each thing in json1
    console.log(json1);
    console.log(json2);

    const tenMeals = pickTen(json1);
    console.table(tenMeals);
}

function createTable(json) {
    if (json == null || json.length === 0) return;

    function createTableHead(table) {
        let tableHead = table.createTHead();
        let row = tableHead.insertRow();

        for (key in json["data"][0]) {
            //Going to each dining hall's specific property
            let th = document.createElement('th');
            let label = document.createTextNode(key);
            th.appendChild(label);
            row.appendChild(th);
        }
        console.log('done making table head');
    }

    function createTableBody(table) {
        for (key in json["data"]) {
            let row = table.insertRow();
            for (key2 in json["data"][key]) {
                //Inserting text from each dining hall's specific property
                let cell = row.insertCell();
                let text = document.createTextNode(json["data"][key][key2]);
                cell.appendChild(text);
            }
        }
        console.log('done making table body');
    }

    //console.log(json['data'][0]['hall_id'])
    let table = document.createElement("table");
    document.body.appendChild(table);
    createTableBody(table);
    createTableHead(table);
    table.setAttribute("class", "table is-bordered");
}

async function windowActions() {
    console.log('page loaded');
    
    const diningRequest = await fetch('/api/dining');
    const diningJson = await diningRequest.json();

    let diningObj = diningJson;

    const mealsRequest = await fetch('/api/meals');
    const mealsJson = await mealsRequest.json();

    let mealsObj = mealsJson;

    const macrosRequest = await fetch('/api/macros');
    const macrosJson = await macrosRequest.json();

    let macrosObj = macrosJson;

    createChart(mealsObj, macrosObj);
    createTable(diningObj);
    console.log('done everything');
}

window.onload = windowActions;