// Creating the map 
let myMap = L.map("map", {
    center: [20.771523, -34.566583],
    zoom: 2
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Initialize base cases for choropleth map
let firstTime = true;

let geojson;

// Initialize dictionary to hold changes for dashboard
let selected_parameters = {
    user_year: "",
    user_category: "",
    user_country: ""
};

// Function updates choropleth map based on year selection
function updateChoropleth(selectedYear) {
    console.log("updateChoropleth()");
    if (firstTime) {

        createChoropleth(selectedYear);

        firstTime = false;

    } else {

        myMap.removeLayer(geojson);

        createChoropleth(selectedYear);

    }
}

// Function creates wri score layer for choropleth map
function createChoropleth(selectedYear) {
    console.log("createChoropleth.()");

    // Get the data with d3.
    d3.json("/get_geojson").then(function(data) {

        // create choropleth layer 
        geojson = L.choropleth(data, {

            // define property in the features to use 
            valueProperty: `wri_${selectedYear}`,

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

            // Binding a popup to each layer
            onEachFeature: function(feature, layer) {
                layer.bindPopup("<strong>" + feature.properties.ADMIN + "</strong><br />" +
                "WRI Score: " + feature.properties[`wri_${selectedYear}`]);
            }

        }).addTo(myMap);

    });

}

// Function to draw a donut chart by category and year
function DrawPiePlot(selectedYear, selectedCategory) {

    console.log("DrawPiePlot()");

    d3.json("/wri_index").then(data => {

        // Initialize name and year for the title
        let chart_title = "";
        if (selectedCategory == "wri_category") {
            chart_title = `WRI Category ${selectedYear}`;
        } else if (selectedCategory == "exposure_category") {
            chart_title = `Exposure Category ${selectedYear}`;
        } else if (selectedCategory == "vulnerability_category") {
            chart_title = `Vulnerability Category ${selectedYear}`;
        } else {
            chart_title = `Susceptibility Category ${selectedYear}`;
        };

        // Filter and select the data by year and category
        let my_data = data.filter(element => element.year == selectedYear);
        let my_sample = my_data.map(element => element[selectedCategory]);

        // Initialize dictionary to count instances of rank
        let rank_count = {
            very_low: 0,
            low: 0,
            medium: 0,
            high: 0,
            very_high: 0,
            na: 0
        };

        // Count instances of rank
        for (let i = 0; i < my_sample.length; i++) {
            if (my_sample[i] == "Very Low") {
                rank_count["very_low"]++;
            } else if (my_sample[i] == "Low") {
                rank_count.low++;
            } else if (my_sample[i] == "Medium") {
                rank_count.medium++;
            } else if (my_sample[i] == "High") {
                rank_count.high++;
            } else if (my_sample[i] == "Very High") {
                rank_count.very_high++;
            } else {
                rank_count.na++;
            };
        };

        // Create options for donut chart
        let options = {
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            name:{
                                show: true
                            },
                            value: {
                                show: true
                            }
                        }
                    }
                }
            },
            series: [rank_count.very_low, rank_count.low, rank_count.medium, rank_count.high, rank_count.very_high, rank_count.na],
            labels: ["Very Low", "Low", "Medium", "High", "Very High", "NA"],
            chart: {
                type: 'donut'
            },
            title: {
                text: chart_title,
                align: "center",
                offsetX: -50
            },
            colors: ["#3498DB", "#27AE60", "#F1C40F", "#E67E22", "#C0392B", "#7F8C8D"],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };

        // Plot donut chart
        let chart = new ApexCharts(document.querySelector("#apex-donut-chart"), options);
        chart.render();

    });
};

// Function to draw a line chart by country name
function DrawLinePlot(selected_country_name) {

    console.log("DrawLinePlot()");

    d3.json("/wri_index").then(data => {

        // Select data for specific country over the years
        let my_data = data.filter(element => element.country_name == selected_country_name);

        let country_name = my_data.map(element => element.country_name)[0];

        // Set up options for ApexChart
        let options = {
            series: [
            {
                name: "WRI",
                data: my_data.map(element => element.wri)
            },
            {
                name: "Exposure",
                data: my_data.map(element => element.exposure)
            },
            {
                name: "Vulnerability",
                data: my_data.map(element => element.vulnerability)
            },
            {
                name: "Susceptibility",
                data: my_data.map(element => element.susceptibility)
            }
            ],
            chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: `Scores for ${country_name}`,
                align: 'left'
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: my_data.map(element => element.year),
                title: {
                    text: 'Year'
                }
            },
            yaxis: {
                title: {
                    text: 'Score'
                },
                min: 0,
                max: 100
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            }
        };
        
        // Plot line chart
        let chart = new ApexCharts(document.querySelector("#apex-line-chart"), options);
        chart.render();
        
    });

};

// Function to allow data to load and update for line and pie chart
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// Function to display country info based on country and year
function generalInfo(selectedYear, selectedCountry) {
    console.log("generalInfo()");

    d3.json("/wri_index").then(data => {

        let country_data = data.filter(element => element.country_name == selectedCountry);
        country_data = country_data.filter(element => element.year == selectedYear)[0];

        // Set letiables to pull out relavent data
        let country_name = country_data.country_name;
        let wri = country_data.wri;
        let exposure = country_data.exposure;
        let vulnerability = country_data.vulnerability;
        let susceptibility = country_data.susceptibility;
        let coping_inability = country_data.coping_inability;
        let adaptive_inability = country_data.adaptive_inability;
        let exposure_category = country_data.exposure_category;
        let wri_category = country_data.wri_category;
        let vulnerability_category = country_data.vulnerability_category;
        let susceptibility_category = country_data.susceptibility_category;

        // Display data on webpage
        document.getElementById("country-name").innerHTML = `country_name: ${country_name}`;
        document.getElementById("wri").innerHTML = `wri: ${wri}`;
        document.getElementById("exposure").innerHTML = `exposure: ${exposure}`;
        document.getElementById("vulnerability").innerHTML = `vulnerability: ${vulnerability}`;
        document.getElementById("susceptibility").innerHTML = `susceptibility: ${susceptibility}`;
        document.getElementById("coping-inability").innerHTML = `coping_inability: ${coping_inability}`;
        document.getElementById("adaptive-inability").innerHTML = `adaptive_inability: ${adaptive_inability}`;
        document.getElementById("exposure-category").innerHTML = `exposure_category: ${exposure_category}`;
        document.getElementById("wri-category").innerHTML = `wri_category: ${wri_category}`;
        document.getElementById("vulnerability-category").innerHTML = `vulnerability_category: ${vulnerability_category}`;
        document.getElementById("susceptibility-category").innerHTML = `susceptibility_category: ${susceptibility_category}`;

    });

}

// Function to implement any changes made on the dashboard. Two iterations needed for data to be loaded properly
let firstIterative = true;
function optionsChanged() {
    console.log("optionsChanged()");

    if (firstIterative) {

        updateChoropleth(selected_parameters["user_year"]);

        generalInfo(selected_parameters["user_year"], selected_parameters["user_country"]);

        DrawPiePlot(selected_parameters["user_year"], selected_parameters["user_category"]);

        DrawLinePlot(selected_parameters["user_country"]);

        firstIterative = false;

        sleep(5000).then(() => {
            optionsChanged();
        });

    } else {

        DrawPiePlot(selected_parameters["user_year"], selected_parameters["user_category"]);

        DrawLinePlot(selected_parameters["user_country"]);

        firstIterative = true;

    }
}

// Updates year change on click
function yearChanged(selectedYear) {
    console.log("yearChanged()");
    selected_parameters["user_year"] = selectedYear;
}

// Updates category change on click
function categoryChanged(selectedCategory) {
    console.log("categoryChanged()");
    selected_parameters["user_category"] = selectedCategory;
}

// Updates country change on click
function countryChanged(selectedCountry) {
    console.log("countryChanged()");
    selected_parameters["user_country"] = selectedCountry;
}

// Function to compute unique values in a list
function unique(value, index, self) {
    return self.indexOf(value) == index;
}

function InitDashboard() {
    console.log("InitDashboard");

    // Get handles to drowpdown menus
    let year_selector = d3.select("#selYear");

    let category_selector = d3.select("#selCategory");

    let country_selector = d3.select("#selCountry");

    d3.json("/wri_index").then(data => {

        let duplicate_countries = data.map(element => element.country_name);

        let countries = duplicate_countries.filter(unique).sort();

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
            category_selector.append("option").text(selectedCategory).property("value", selectedCategory);
        };

        let initialCategory = category_selector.property("value");
        console.log(`initialCategory = ${initialCategory}`);

        // Populate country dropdown
        for (let i = 0; i < countries.length; i++) {
            selectedCountry = countries[i];
            country_selector.append("option").text(selectedCountry).property("value", selectedCountry);
        };

        let initialCountry = country_selector.property("value");
        console.log(`initialCountry = ${initialCountry}`);

        selected_parameters["user_year"] = initialYear;
        selected_parameters["user_category"] = initialCategory;
        selected_parameters["user_country"] = initialCountry;

        updateChoropleth(initialYear);

        generalInfo(initialYear, initialCountry);

        DrawPiePlot(initialYear, initialCategory);

        DrawLinePlot(initialCountry);

    });
}

InitDashboard();