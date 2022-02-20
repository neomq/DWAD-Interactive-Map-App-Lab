// 1. Create API base URL, and API key
const API_BASE_URL="https://api.foursquare.com/v3";
const API_KEY="fsq39KAcQFbTaS1UcZfkT7ZQAkGv7nIP4Wtkhziu4dcLibg=";

// 2. Create an async function search() that takes in the lat, lng and query
async function search(lat, lng, query) {
    let ll = lat + ',' + lng; // pass the lat, lng to foursquare not as an array but as a string - lat & lng seperated by a comma

    // example:
    // if ll is "103,31"
    // and query is "chicken rice"
    // then the query string will be "?ll=103,31&query=chicken rice&v=20220211"

    let response = await axios.get(API_BASE_URL + '/places/search', {
        // pass in the params
        params: {
            'll': ll,
            'v': '02112022', // lock the version of foursquare to the one on this date
            'query': query
        },
        // headers is for us to put in the API Key
        // Note: use uppercase 'A' and american spelling otherwise it will not work
        headers: {
            'Accept': 'application/json',
            'Authorization': API_KEY
        }
    })
    return response.data;
    // to test the search function in the console, type e.g. --> await search(1.3521,103.8198, "hotel")
}