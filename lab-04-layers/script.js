// Generate random markers
function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
}

// 1. INITIALISE THE MAP
let singapore = [1.29, 103.85];

// 2. CREATE THE MAP
let mapObject = L.map('sgMap').setView(singapore, 13);

// 3. SETUP TILE LAYERS
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(mapObject); // Add to map object created in line 12

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// 8. CREATE A NEW LAYER GROUP
// A layer group can contain other layers
// A layer can be: a layer group, or a marker, or a shape or etc etc.
// A layer group is like a generic container that can store all kinds of layers

////// FIRST LAYER GROUP //////
// add 10 different random markers to the layer group

let group1 = L.layerGroup();
for (let i=0; i<10; i++){
    let m = L.marker(getRandomLatLng(mapObject)); // 1. create the markers
    m.addTo(group1); // 2. add the markers to the layer group
}
group1.addTo(mapObject); // 3. add the layer group to the map

////// SECOND LAYER GROUP //////
// add 10 random green circles to the layer group

let group2 = L.layerGroup();
for (let i=0; i<10; i++){
    let position = getRandomLatLng(mapObject);

    // 1. create the circles
    let c = L.circle(position, {
    color: 'red',
    fillColor:"green",
    fillOpacity:0.5,
    radius: 250
    });

    c.addTo(group2); // 2. add the circles to the layer group
}
group2.addTo(mapObject); // 3. add the layer group to the map

////// THIRD LAYER GROUP //////
// add 10 random orange circles to the layer group

let group3 = L.layerGroup();
for (let i=0; i<10; i++) {
    let position = getRandomLatLng(mapObject);

    // 1. create the circles
    let c = L.circle(position, {
    color: 'red',
    fillColor:"orange",
    fillOpacity:0.5,
    radius: 250
    });

    c.addTo(group3); // 2. add the circles to the layer group
}
group3.addTo(mapObject); // 3. add the layer group to the map

////// FOURTH LAYER GROUP //////
// add a marker cluster as a layer
let markerCluster = L.markerClusterGroup();
for (let i=0; i<10; i++) {
    let position = getRandomLatLng(mapObject);
    L.marker(position).addTo(markerCluster);
}
markerCluster.addTo(mapObject)


// 8.1 CREATE AN OVERLAY STORING THE LAYERS

let baseLayers = {
    'markers': group1
}
let overlays = {
    'green circles': group2,
    'red circles': group3,
    'clusters': markerCluster
}

// Add the overlays to the map
L.control.layers(baseLayers, overlays).addTo(mapObject);

// NOTE: overlays are represented by checkboxes --> more than one overlay can be toggled on/off
// Base layers are represented by radio buttons --> only one base layer group can be activated

// BUTTON ELEMENT TO TOGGLE THE LAYERS
document.querySelector('#btnToggle').addEventListener('click', function(){
    if (mapObject.hasLayer(group3)) {
        mapObject.removeLayer(group3);
    } else {
        mapObject.addLayer(group3);
    }
});