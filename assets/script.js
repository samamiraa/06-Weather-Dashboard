const location = document.getElementById("location-input");
const locationInput = location.value;
const locationSearch = document.getElementById("location-search");

function searchLocation() {
    
}

const requestUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "/?key=" + apiKey;
