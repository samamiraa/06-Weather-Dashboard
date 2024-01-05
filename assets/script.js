let locationSearch = $("#search-btn");
let locationValue = $("#location-input");
let locationSearchValue = locationValue.val();
let apiKey = api_Key;

locationSearch.on("click", function() {
    event.preventDefault();
    console.log(locationValue.val());
    weatherAPIFetch();
});

function weatherAPIFetch() {
    const requestUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + locationSearchValue + "/?key=" + apiKey;
};


