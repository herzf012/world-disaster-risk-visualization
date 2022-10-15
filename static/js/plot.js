console.log("Loaded plot.js");

// Temporary hardcoded input values
let user_year = "2021";
let user_category = "wri_category";
let user_country_name = "United States of America";



// d3.json("/wri_index").then(function (data) {

//     console.log(data[0]['country_name']);

//     // let years = data.map(year => year.year);

//     // console.log(years)

//     // Create the trace
//     let trace = {
//         x: data.map(wri => wri.wri),
//         y: data.map(year => year.year),
//         type: "bar"
//     };

//     // Put the trace into an array (which allows us to graph
//     // multiple traces, if we wish)
//     let traceData = [trace];

//     // Define a layout object
//     let layout = {
//         title: "World Risk Index by Year",
//         xaxis: { title: "Year"},
//         yaxis: { title: "WRI"}
//     };

//     // Create the plot
//     Plotly.newPlot("plot1", traceData, layout); 

// });

// LIEF'S CODE BELOW

// Function to draw a donut chart by category and year
function DrawPiePlot(category, selected_year) {

    console.log("DrawPiePlot");

    d3.json("/wri_index").then(data => {

        // Initialize name and year for the title
        let chart_title = "";
        if (category == "wri_category") {
            chart_title = `WRI Category ${selected_year}`;
        } else if (category == "exposure_category") {
            chart_title = `Exposure Category ${selected_year}`;
        } else if (category == "vulnerability_category") {
            chart_title = `Vulnerability Category ${selected_year}`;
        } else {
            chart_title = `Susceptibility Category ${selected_year}`;
        };

        // Filter and select the data by year and category
        let my_data = data.filter(element => element.year == selected_year);
        let my_sample = my_data.map(element => element[category]);

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
        var options = {
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
        var chart = new ApexCharts(document.querySelector("#apex-donut-chart"), options);
        chart.render();

    });

};

// Function to draw a line chart by country name
function DrawLinePlot(selected_country_name) {

    console.log("DrawLinePlot");

    d3.json("/wri_index").then(data => {

        // Select data for specific country over the years
        let my_data = data.filter(element => element.country_name == selected_country_name);

        let country_name = my_data.map(element => element.country_name)[0];

        console.log(country_name);

        // Set up options for ApexChart
        var options = {
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
        var chart = new ApexCharts(document.querySelector("#apex-line-chart"), options);
        chart.render();
        
    });

};

// Function to draw all plots
function DrawPlots() {

    DrawPiePlot(user_category, user_year);

    DrawLinePlot(user_country_name);

};

DrawPlots();

// LIEF'S CODE ABOVE