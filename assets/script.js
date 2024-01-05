let locationSearch = $("#search-btn");
let locationValue = $("#location-input");
let apiKey = api_Key;

locationSearch.on("click", function() {
    event.preventDefault();
    console.log(locationValue.val());
    weatherAPIFetch();
});

function weatherAPIFetch() {
    const requestUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + locationValue.val() + "/?key=" + apiKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
};


