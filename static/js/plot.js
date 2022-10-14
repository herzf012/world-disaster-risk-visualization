console.log("Loaded plot.js");

d3.json("/wri_index").then(function (data) {

    console.log(data)

    // // ... and dump that JSON to the console for inspection
    // console.log(data);
    // country_wri = data.map(item => {
    //     container = {};
    
    //     container[item.region] = item.region;
    //     container[item.year] = item.year;
    //     container[item.wri] = item.wri;

    //     // Create the trace
    //     let trace = {
    //         x: container[item.wri],
    //         y:container[item.year],
    //         type: "bar"
    //     };

    //     // Put the trace into an array (which allows us to graph
    //     // multiple traces, if we wish)
    //     let traceData = [trace];

    //     // Define a layout object
    //     let layout = {
    //         title: "World Risk Index by Year",
    //         xaxis: { title: "WRI"},
    //         yaxis: { title: "Year"}
    //     };

    //     // Create the plot
    //     Plotly.newPlot("plot1", traceData, layout); 

    //     return container
    // });

});

