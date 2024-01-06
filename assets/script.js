let locationSearch = $("#search-btn");
let locationValue = $("#location-input");
let apiKey = api_Key;
let weatherData;

locationSearch.on("click", function() {
    event.preventDefault();
    console.log(locationValue.val());

    let searchCity = JSON.parse(localStorage.getItem("citySearch"));

    if (!searchCity) {
        searchCity = [];
    };

    searchCity.push(locationValue.val());
    localStorage.setItem("citySearch", JSON.stringify(searchCity));

    weatherAPIFetch();
    addPreviousCity();

    locationValue.val("");
});

function addPreviousCity() {

    let searchCity = JSON.parse(localStorage.getItem("citySearch"));

    if (!searchCity) {
        searchCity = [];
    };

    console.log(searchCity);

    for (i = 0; i < searchCity.length; i++) {
        let previousCity = `
        <li><a class="dropdown-item text-color" onclick="previousWeatherFetch(event)">${searchCity[i]}</a></li>
        `;
    
        $(".dropdown-menu").append(previousCity);
    };
   
};

function weatherAPIFetch() {
    const requestUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + locationValue.val() + "/?key=" + apiKey;

    fetchWeather(requestUrl);
};

function previousWeatherFetch(event) {
    const requestUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + $(event.target).text() + "/?key=" + apiKey;

    fetchWeather(requestUrl);
};


function fetchWeather(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });

        let weatherIcon = $(".weather-icon");
        let dates = $(".date");

        console.log()
};

addPreviousCity();