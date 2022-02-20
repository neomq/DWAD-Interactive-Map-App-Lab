// 1. INITIALISE THE MAP
let singapore = [1.29, 103.85];

// 2. CREATE THE MAP
let mapObject = L.map('sgMap').setView(singapore, 13);

// 3. SETUP THE TILE LAYERS - BOILERPLATE
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(mapObject); // Add to map object created in line 12

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// LOAD IN THE CYCLING TRACKS DATA
async function loadCyclingPath(){
    let response = await axios.get('data/cycle.geojson');
    // second argument is a config object
    let cyclingLayer = L.geoJson(response.data, {
        // NOTE: every line in the geojson file is known as a feature - we are able to process each feature
        onEachFeature:function(feature, layer) {
            // feature -- stores the information about the feature
            // layer is the line or shape that is being drawn onto the map
            // console.log(feature.properties) // do this to inspect the feature properties of your geojson file
            layer.bindPopup(feature.properties.Description);

            // feature.properties.Description is HTML
            let dummyDiv = document.createElement('div');
            dummyDiv.innerHTML = feature.properties.Description;
            let columns = dummyDiv.querySelectorAll('td');
            let pathname = columns[0].innerHTML;
            let agency = columns[1].innerHTML;
            layer.bindPopup(`<div>
                                <ul>
                                    <li>Path Name: ${pathname}</li>
                                    <li>Agency: ${agency}</li>
                                </ul>
                            </div>`);
        }
    }).addTo(mapObject); // this is also a layer that can go into the base layer or overlays
    
    // style the layer --> check documentation for more customisation options
    cyclingLayer.setStyle({
        'color': 'red'
    })
    
    return cyclingLayer;
};

// LOAD IN THE NPARKS DATA
async function loadNParks(){
    let response = await axios.get('data/nparks.geojson');
    let nparks = L.geoJson(response.data, {
        onEachFeature:function(feature, layer) {
            // layer.bindPopup(feature.properties.Description);
            let dummyDiv = document.createElement('div');
            dummyDiv.innerHTML = feature.properties.Description;
            let columns = dummyDiv.querySelectorAll('td');
            let parkname = columns[0].innerHTML;
            let pathtype = columns[1].innerHTML;
            let loop = columns[2].innerHTML;
            layer.bindPopup(`<div>
                                <ul>
                                    <li>Path Name: ${parkname}</li>
                                    <li>Agency: ${pathtype}</li>
                                    <li>Loop: ${loop}</li>
                                </ul>
                            </div>`);
        }
    }).addTo(mapObject); // this is also a layer that can go into the base layer or overlays
    
    // style the layer
    nparks.setStyle({
        'color': 'green'
    })
    
    return nparks;
};

window.addEventListener('DOMContentLoaded', function(){
    loadCyclingPath();
    loadNParks(); 
});