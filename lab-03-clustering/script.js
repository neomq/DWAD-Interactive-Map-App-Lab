// function to generate random markers:
function getRandomLatLng(mapObject){
    
    // get the boundaries of the map
    let bounds = mapObject.getBounds();

    // get upper right and lower left of the map window
    let southwest = bounds.getSouthWest();
    let northeast = bounds.getNorthEast();

    // calculate the length and width of the map window in lat, lng
    let lngSpan = northeast.lng - southwest.lng;
    let latSpan = northeast.lat - southwest.lat;

    let randomLng = Math.random() * lngSpan + southwest.lng;
    let randomLat = Math.random() * latSpan + southwest.lat;

    return [ randomLat, randomLng,];

    // Diagram:
    //                                  (NE)
    //           ------ lngSpan ------  (lat, lng)
    //           |                   | 
    //           |                   | 
    //        latSpan     MAP     latSpan
    //           |                   | 
    //           |                   | 
    //           ------ lngSpan ------ 
    //       (SW)
    // (lat, lng)
}


// 1. INITIALISE THE MAP
// Create a map of the center of Singapore
// use an array of 2 elements to represent the lat and long
let singapore = [1.29, 103.85];

// 2. CREATE THE MAP
// L is the leaflet object in the global scope
// (created from the leaflet JS file)
// L.map() creates a map object
// and takes in one argument (the ID to place the map)
// .setView() --> .setView(center coordinates, zoom level) 
let mapObject = L.map('sgMap').setView(singapore, 13);

// 3. SETUP THE TILE LAYERS - BOILERPLATE
// in other words - the drawing of the map
// copy and paste the boilerplate from leaflet
// for different views/colors - explore mapbox - map styles
// get own mapbox access token (below access token for demo only)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(mapObject); // Add to map object created in line 12

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// 7. MARKER CLUSTERING
// refer to function at the beginning of JS to generate random markers
// 7.1 First, create a marker cluster layer
//     L.markerClusterGroup() --> from the plug-in js and css
let markerClusterLayer = L.markerClusterGroup(); 

// put 1000 random markers on the map
for (let i = 0; i < 1000; i++) {
    let pos = getRandomLatLng(mapObject);
    let marker = L.marker(pos);

    // 7.2 Next, add the markers to the marker cluster layer.
    marker.addTo(markerClusterLayer);
}
// 7.3 Finally, add the marker cluster layer to the map
markerClusterLayer.addTo(mapObject);








