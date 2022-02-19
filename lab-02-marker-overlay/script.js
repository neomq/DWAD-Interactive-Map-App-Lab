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

// 4. ADD MARKERS AND OVERLAYS
// anything that you add onto a map is called an overlay
// 4.1 create a marker using the L object
//     and specify the marker coordinates
let singaporeMarker = L.marker([1.29, 103.85]);
// 4.2 add the marker to the map
singaporeMarker.addTo(mapObject);

// 5. ADD A POP-UP BOX TO THE MARKER
// use .bindPopup()
singaporeMarker.bindPopup("<h2>Singapore</h2><p>Singapore, officially the Republic of Singapore, is a sovereign island city-state in maritime Southeast Asia.</p>");
// 5.1 ADD EVENT LISTENER FOR MORE CUSTOMISED BEHAVIOUR
singaporeMarker.addEventListener('click', function(){
    alert("Hello!");
    // do anything you want i.e. use axios to fetch data
    // or change more HTML elements etc..
})

// 6. ADD BASIC SHAPES TO THE MAP
// check leaflet documentation for all the possibilities
// adding a circle using L.circle (in the center of bukit timah)
// first argument is the coordinates, second argument is the customisation
// consult leaflet documentation for all the properties that can be used
let circle = L.circle([1.3294, 103.8021], {
    color: '#1B84FF',
    fillColor: 'orange',
    fillOpacity: 0.5,
    radius: 500 // meters
}).addTo(mapObject); // add the shape to the map