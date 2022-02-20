// RETRIEVE EARTHQUAKE DATA
async function getEarthquakeData(){
    let response = await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson");
    // console.log(response.data);
    
    let earthquakeLatLng = []; // create an array to store the coordinates
    
    for (let e of response.data.features) {
        let lat = e.geometry.coordinates[1];
        let lng = e.geometry.coordinates[0];
        earthquakeLatLng.push([lat,lng])
    }
    return earthquakeLatLng; // return the array
}

window.addEventListener("DOMContentLoaded", async function(){
    let earthquakeLatLng = await getEarthquakeData();
    // console.log(earthquakeLatLng);
    plotEarthquake(earthquakeLatLng, cluster); // pass cluster group as a second argument
});

// PLOT ALL THE EARTHQUAKES
// pass cluster group as a second argument
function plotEarthquake(earthquakes, cluster){
    for (let e of earthquakes){
        let marker = L.marker(e);
        marker.addTo(cluster); // add the markers to cluster
    }
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

// Assign marker cluster as a global variable
let cluster = L.markerClusterGroup();
cluster.addTo(mapObject);










