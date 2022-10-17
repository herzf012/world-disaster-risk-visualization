
// Creating the map 
let myMap = L.map("map", {
    center: [20.771523, -34.566583],
    zoom: 2
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let geojson;

// Get the data with d3.
d3.json("/get_geojson").then(function(data) {

    console.log(data);

    // create choropleth layer 
    geojson = L.choropleth(data, {

        // define property in the features to use 
        valueProperty: "wri_2011",

        // set colors 
        scale:["#ffffb2", "#b10026"],

        // step range 
        steps: 10,

        // quartile, equidistant, k-means 
        mode: "q",
        style: {
            color:"#fff",
            weight: 1,
            fillOpacity:0.8
        },
    }).addTo(myMap);    

});

function yearChanged(selectedYear) {
    console.log(selectedYear);
}

function categoryChanged(selectedCategory) {
    console.log(selectedCategory);
}

function InitDashboard() {
    console.log("InitDashboard");

    // Get handles to drowpdown menus
    let year_selector = d3.select("#selYear");

    let category_selector = d3.select("#selCategory");

    d3.json("/wri_index").then(data => {

        let categories = ["wri_category", "exposure_category", "vulnerability_category", 
        "susceptibility_category"];

        let years = ["2011", "2012", "2013", "2014", "2015", "2016",
        "2017", "2018", "2019", "2020", "2021"];

        // Populate year dropdown
        for (let i = 0; i < years.length; i++) {
            selectedYear = years[i];
            year_selector.append("option").text(selectedYear).property("value", selectedYear);
        };

        let initialYear = year_selector.property("value");
        console.log(`initialYear = ${initialYear}`);

        // Populate category dropdown
        for (let i = 0; i < categories.length; i++) {
            selectedCategory = categories[i];
            console.log(selectedCategory);
            category_selector.append("option").text(selectedCategory).property("value", selectedCategory);
        };

        let initialCategory = category_selector.property("value");
        console.log(`initialCategory = ${initialCategory}`);

    });
}

InitDashboard();