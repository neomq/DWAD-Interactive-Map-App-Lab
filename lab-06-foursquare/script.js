// Create a foursquare map using an application framework

// 1. Create a main function which is the entry point of our application
async function main() {
    
    // 2. Create a nested function inside main() function
    //    Do all the event listeners etc inside function init()
    function init(){
        let mapObject = initMap();

        // 6. Create a search result layer
        let searchResultLayer = L.layerGroup();
        searchResultLayer.addTo(mapObject);
        // See 6.1 and 6.2 below

        window.addEventListener('DOMContentLoaded', function(){

            // 4. Create function that will run when user clicks on the search button on the map
            document.querySelector('#search-btn').addEventListener('click', async function(){
            
            // 6.2 Clear all prior markers from the search layer group
            //     get rid of all existing markers
            searchResultLayer.clearLayers();

            // 4.1 retrieve the search value
            let query = document.querySelector("#search-input").value;

            // 4.2 perform the search only at where the map is looking at
            //     first get the center coordinates
            let center = mapObject.getBounds().getCenter();
            //     then call the search function inside data.js
            let response = await search(center.lat, center.lng, query);
            // console.log(response) // to check the search output

            // 8. Display the search results on the map
            // 8.1 First get the div that will display the search result
            let searchResultElement = document.querySelector("#search-results");

            // 5. Create the markers
            for (let eachVenue of response.results){
                let coordinate = [eachVenue.geocodes.main.latitude, eachVenue.geocodes.main.longitude]
                let marker = L.marker(coordinate);

                // 7. Add a popup to all the search result markers
                marker.bindPopup(`<div>${eachVenue.name}</div>`)

                // marker.addTo(mapObject);
                // 6.1 Add the marker to search result layer instead of the map
                marker.addTo(searchResultLayer);

                // 8.2 Create the child <div> element to append to #search-results div
                let resultElement = document.createElement('div');
                resultElement.innerHTML = eachVenue.name;
                resultElement.className = 'search-result';
                
                // 8.3 Add an event listener to resultElement
                resultElement.addEventListener('click', function(){
                    
                    // when user clicks on the result the map will zoom to the location
                    mapObject.flyTo(coordinate, 16); // check out leaflet documentation - map methods for modifying map state

                    // when user clicks on the result, marker popup will appear
                    marker.openPopup();
                })

                // 8.2 append resultElement to #search-results
                //     test out the feature on the map
                searchResultElement.appendChild(resultElement);

            }
        })

        })
    }

    // 3. Create the initMap() function
    //    The initMap() function is to create our map
    function initMap(){

        // 3.1 Initialise the map
        let singapore = [1.29, 103.85];

        // 3.2 Create the map
        let mapObject = L.map('sgMap').setView(singapore, 13);

        // 3.3 Tile layers boilerplate
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
        }).addTo(mapObject);

        // 3.4 Return the map
        return mapObject;
    }

    init();
}

main();