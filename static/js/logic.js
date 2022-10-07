// Creating the map
let myMap = L.map("map", {
    center: [20.771523, -34.566583],
    zoom: 2
  });
  
  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  

//   link to GeoJson
let link = "https://datahub.io/core/geo-countries/r/countries.geojson"

let mapStyle = {
    color: "yellow",
    fillColor: "purple",
    fillOpacity: 0.5,
    weight: 1.5
};

// getting GeoJson data 
d3.json(link).then(function(data) {
    L.geoJson(data, {
        style: mapStyle
    }).addTo(myMap);
});

// Look at 15:2:4 for example on creating the choroplethdata
