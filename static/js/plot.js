console.log("Loaded plot.js");



d3.json("/wri_index").then(function (data) {

    console.log(data[0]['country_name'])

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

