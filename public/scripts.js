function pickTen(json) {
    //randomly picks 10 entries from the json argument
    if (json == null || json.length === 0) return;

    const result = [];
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

function createChart(json) {
    //returns if json arguments are null or empty
    if (json == null || json.length === 0) return;

    const calories = [];
    const carbs = [];
    const sodium = [];
    const protein = [];
    const fat = [];
    const cholesterol = [];

    //external code
    let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Sample Meals and Their Nutrition"
        },
        axisX: {
            interval: 1
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
            name: "Calories",
            showInLegend: "true",
            dataPoints: calories
        },
        {
            type: "stackedBar",
            name: "Carbs",
            showInLegend: "true",
            dataPoints: carbs 
        },
        {
            type: "stackedBar",
            name: "Sodium",
            showInLegend: "true",
            dataPoints: sodium 
        },
        {
            type: "stackedBar",
            name: "Protein",
            showInLegend: "true",
            dataPoints: protein 
        },
        {
            type: "stackedBar",
            name: "Fat",
            showInLegend: "true",
            dataPoints: fat 
        },
        {
            type: "stackedBar",
            name: "Cholesterol",
            showInLegend: "true",
            dataPoints: cholesterol 
        }]
    });
    //end external code

    //my code
    function organizeData(newArray, macro) {
        for (let i = 0; i < json.length; i++) newArray.push({
            label: json[i]["name"],
            y: json[i][macro]
        });
        console.log(newArray);
    }

    //this is going to be so ugly but whatever
    organizeData(calories, "calories");
    organizeData(carbs, "carbs");
    organizeData(sodium, "sodium");
    organizeData(protein, "protein");
    organizeData(fat, "fat");
    organizeData(cholesterol, "cholesterol");

   

    //external code
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

    console.log('done making chart');
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

    //getting all meals and respective macros
    const mealsAndMacrosRequest = await fetch('/api/macroChart');
    const mealsAndMacrosJson = await mealsAndMacrosRequest.json();
    let mealsAndMacrosObj = mealsAndMacrosJson;

    //randomly picking 10 meals
    const tenMeals = pickTen(mealsAndMacrosObj);

    createChart(tenMeals);
    createTable(diningObj);
    console.log('done everything');
}

window.onload = windowActions;