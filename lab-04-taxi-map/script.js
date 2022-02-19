// Function to retrieve taxi data
async function getTaxi(){
    let response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    //console.log(response.data);
    return response.data.features[0].geometry.coordinates;
}

window.addEventListener("DOMContentLoaded", async function(){
    // wait for getTaxi to be loaded and then store its return value
    // into taxiCoordinates

    let taxiCoordinates = await getTaxi();
    //console.log(taxiCoordinates);

     // CREATE THE MARKER CLUSTER LAYER
     let markerClusterLayer = L.markerClusterGroup();
    
    // CREATE THE TAXI MARKERS
    for (let t of taxiCoordinates) {
        // each t is an array
        // element 0 is lng, element 1 is lat
        let lat = t[1];
        let lng = t[0];
        let marker = L.marker([lat,lng]);
        marker.addTo(markerClusterLayer);
    }
    markerClusterLayer.addTo(mapObject);
});

// Note: Flow of program
// 1. when all the DOM elements are loaded at line 8, the function is called.
// 2. at line 11 getTaxi() is called. JS bookmarks getTaxi() at line 11.
// 3. Inside getTaxi() at line 2, JS will bookmark line 3 and perform other stuff
// 4. after the data has been retrieved, axios will tell JS that the data at line 3 is ready to go
//    JS will pause whatever it is doing and goes back to line 3 to put the data into response variable
//    and return response.data.features[0].geometry.coordinates;
//    At this point the getTaxi() function at line 2 finishes.
// 5. At line 11, the getTaxi() function also finishes, JS will carry on to line 12


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











