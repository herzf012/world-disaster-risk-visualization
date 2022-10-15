console.log("Loaded plot.js");

let user_year = "2021";



d3.json("/wri_index").then(function (data) {

    console.log(data[0]['country_name']);

    // let years = data.map(year => year.year);

    // console.log(years)

    // Create the trace
    let trace = {
        x: data.map(wri => wri.wri),
        y: data.map(year => year.year),
        type: "bar"
    };

    // Put the trace into an array (which allows us to graph
    // multiple traces, if we wish)
    let traceData = [trace];

    // Define a layout object
    let layout = {
        title: "World Risk Index by Year",
        xaxis: { title: "Year"},
        yaxis: { title: "WRI"}
    };

    // Create the plot
    Plotly.newPlot("plot1", traceData, layout); 

});

// LIEF'S CODE BELOW
function DrawPieChart(category, selected_year) {

    console.log(category);
    console.log("DrawPieChart");

    d3.json("/wri_index").then(data => {

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

        let my_data = data.filter(element => element.year == selected_year);
        let my_sample = my_data.map(element => element[category]);

        console.log(`${category} values: ${my_sample}`);

        let rank_count = {
            very_low: 0,
            low: 0,
            medium: 0,
            high: 0,
            very_high: 0,
            na: 0
        };

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

        console.log(rank_count);

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
  
        var chart = new ApexCharts(document.querySelector("#apex-chart"), options);
        chart.render();

    })

};

DrawPieChart("wri_category", user_year);
// DrawPieChart("exposure_category", user_year);
// DrawPieChart("vulnerability_category", user_year);
// DrawPieChart("susceptibility_category", user_year);
// LIEF'S CODE ABOVE