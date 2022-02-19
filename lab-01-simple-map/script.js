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