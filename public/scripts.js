function pickTen(json) {
    //randomly picks 10 entries from the json argument
    if (json == null || json.length === 0) return;

    const result = [];
    //i don't know why it spits out 10 results when i set it to i < 22
    //but some things are just better left alone
    for (let i = 0; i < json.length; i++) {
        const random = Math.floor(Math.random() * json.length);
        if (result.length === 10) break;
        if (result.indexOf(json[random]) !== -1) continue;
        result.push(json[random]);
        i++;
    }

    //returning the 10 randomly picked entries
    return result;
}

function createChart(json1, json2) {
    //returns if json arguments are null or empty
    if (json1 == null || json1.length === 0 || json2 == null || json2.length === 0) return;

    //external code
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Sample Meals and Nutrition"
        },
        axisX: {
            valueFormatString: ""
        },
        axisY: {
            prefix: ""
        },
        toolTip: {
            shared: true
        },
        legend:{
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "stackedBar",
            name: "Meals",
            showInLegend: "true",
            dataPoints: [
                { x: new Date(2017, 0, 30), y: 56 },
                { x: new Date(2017, 0, 31), y: 45 },
                { x: new Date(2017, 1, 1), y: 71 },
                { x: new Date(2017, 1, 2), y: 41 },
                { x: new Date(2017, 1, 3), y: 60 },
                { x: new Date(2017, 1, 4), y: 75 },
                { x: new Date(2017, 1, 5), y: 98 }
            ]
        }]
    });
    chart.render();
    
    function toggleDataSeries(e) {
        if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
    //end external code
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

    //getting all dining halls
    const diningRequest = await fetch('/api/dining');
    const diningJson = await diningRequest.json();
    let diningObj = diningJson;

    const mealsAndMacrosRequest = await fetch('/api/macroChart');
    const mealsAndMacrosJson = await mealsAndMacrosRequest.json();
    let mealsAndMacrosObj = mealsAndMacrosJson;

    console.log(mealsAndMacrosObj);

    //randomly picking 10 meals
    const tenMeals = pickTen(mealsAndMacrosObj);
    console.log(tenMeals);

    //createChart(mealsObj, macrosObj);
    createTable(diningObj);
    console.log('done everything');
}

window.onload = windowActions;