let locationSearch = $("#search-btn");
let locationValue = $("#location-input");
let apiKey = api_Key;
let weatherData;
let headingContainer = $("#heading-container");

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
    const requestUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + locationValue.val() + "/?key=" + apiKey + "&iconSet=icons1";

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

            let weatherIcon = $(".weather-icon");
            let dates = $(".date");
            let description = $(".description");
            let temperature = $(".temperature");
            let humidity = $(".humidity");
            let windSpeed = $(".wind-speed");

            let snowPath = "./images/snowing.png";
            let rainPath = "./images/rain.png";
            let cloudyPath = "./images/cloudy.png";
            let partlyCloudyPath = "./images/partly-cloudy.png";
            let fogPath = "./images/foggy.png";
            let windPath = "./images/wind-and-cloud.png"
            let sunnyPath = "./images/sunny.png"

            resolvedAddress = data.resolvedAddress;
            console.log(resolvedAddress);

            $("#heading-container").text(resolvedAddress);

            for (i = 0; i < data.days.length; i++) {
                $(dates).eq(i).text(data.days[i].datetime);
                $(description).eq(i).text(data.days[i].description);
                $(temperature).eq(i).text("Temp: " + data.days[i].temp + " °C");
                $(humidity).eq(i).text("Humidity: " + data.days[i].humidity);
                $(windSpeed).eq(i).text("Wind Speed: " + data.days[i].windspeed + " Kph");
                console.log(data.days[i].icon);

                if (data.days[i].icon == "snow") {
                    $(weatherIcon).eq(i).attr("src", snowPath);
                } else if (data.days[i].icon == "rain") {
                    $(weatherIcon).eq(i).attr("src", rainPath);
                } else if (data.days[i].icon == "cloudy") {
                    $(weatherIcon).eq(i).attr("src", cloudyPath);
                } else if (data.days[i].icon == "partly-cloudy-day") {
                    $(weatherIcon).eq(i).attr("src", partlyCloudyPath);
                } else if (data.days[i].icon == "partly-cloudy-night") {
                    $(weatherIcon).eq(i).attr("src", partlyCloudyPath);
                } else if (data.days[i].icon == "fog") {
                    $(weatherIcon).eq(i).attr("src", fogPath);
                } else if (data.days[i].icon == "wind") {
                    $(weatherIcon).eq(i).attr("src", windPath);
                } else {
                    $(weatherIcon).eq(i).attr("src", sunnyPath);
                }; 
            };
        });
};

addPreviousCity();