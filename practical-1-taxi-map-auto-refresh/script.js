// Function to retrieve taxi data
async function getTaxi(){
    let response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    //console.log(response.data);
    return response.data.features[0].geometry.coordinates;
}

async function showTaxiOnMap(){
    let taxiCoordinates = await getTaxi();
    //console.log(taxiCoordinates);

    // remove all prior markers from the cluster
    markerClusterLayer.clearLayers();
    
    // CREATE THE TAXI MARKERS
    for (let t of taxiCoordinates) {
        // each t is an array
        // element 0 is lng, element 1 is lat
        let lat = t[1];
        let lng = t[0];
        let marker = L.marker([lat,lng]);
        marker.addTo(markerClusterLayer);
    }
}

window.addEventListener("DOMContentLoaded", async function(){
    showTaxiOnMap();

    // every 30s (30000ms) call showTaxiOnMap
    setInterval(showTaxiOnMap, 30000);
});


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


// CREATE THE MARKER CLUSTER LAYER
// Set markerClusterLayer as a global variable
let markerClusterLayer = L.markerClusterGroup();
markerClusterLayer.addTo(mapObject);
// ensures that there is only one marker cluster layer after every refresh





