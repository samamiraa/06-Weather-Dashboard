let locationSearch = $("search-btn");
let locationValue = $("location-input");
let apiKey = apiKey;

locationSearch.on("click", function() {
    console.log();
    weatherAPIFetch();
});

function weatherAPIFetch() {

};

const requestUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "/?key=" + apiKey;
