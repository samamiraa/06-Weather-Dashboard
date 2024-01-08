// variable to access search button
let locationSearch = $("#search-btn");
// variable to access city input
let locationValue = $("#location-input");
// API key from visual crossing
let apiKey = "44ed6a7c8e18cda2e4df46c0da942933";
// undefined weather data variable
let weatherData;
// variable to access heading container
let headingContainer = $("#heading-container");
let cardContainer = $("#card-container");

// event listener for when search button is clicked
locationSearch.on("click", function() {
    // prevents input from disappearing
    event.preventDefault();
    // checks to see locationValue value 
    console.log(locationValue.val());

    // variable to parse the items in local storage from key "citySearch"
    let searchCity = JSON.parse(localStorage.getItem("citySearch"));

    // condition stmt if there is nothing in local storage to set citySearch to empty array
    if (!searchCity) {
        searchCity = [];
    };

    // everytime new searchCity, adds city to end of citySearch array
    searchCity.push(locationValue.val());
    // sets searched city in local storage as string
    localStorage.setItem("citySearch", JSON.stringify(searchCity));

    // calls weatherAPIFetch function
    weatherAPIFetch();
    // calls addPreviousCity function
    addPreviousCity();

    // clears locationValue input
    locationValue.val("");
});

// addPreviousCity function
function addPreviousCity() {

    // variable to parse the items in local storage from key "citySearch"
    let searchCity = JSON.parse(localStorage.getItem("citySearch"));

    // condition stmt if there is nothing in local storage to set citySearch to empty array
    if (!searchCity) {
        searchCity = [];
    };

    // console logs searchCity variable
    console.log(searchCity);

    // iteration to create variable previousCity for each search
    for (i = 0; i < searchCity.length; i++) {
        let previousCity = `
        <li><a class="dropdown-item text-color" onclick="previousWeatherFetch(event)">${searchCity[i]}</a></li>
        `;
    
        // appends template literal to class dropdown menu
        $(".dropdown-menu").append(previousCity);
    };
   
};

// weatherAPIFetch function
function weatherAPIFetch() {
    // URL to use with API
    const requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + locationValue.val() + "&limit=5&appid=" + apiKey;

    console.log(weatherAPIFetch);
    // calls fetchWeather function, passes through requestUrl
    fetchLonLat(requestUrl);
};

// previousWeatherFetch function, adds event
function previousWeatherFetch(event) {
    // URL to use with API
    const requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + $(event.target).text() + "&limit=5&appid=" + apiKey;

    console.log(previousWeatherFetch);
     // calls fetchWeather function, passes through requestUrl
    fetchLonLat(requestUrl);
};

// fetchWeather function, passes through request URL
function fetchLonLat(requestUrl) {
    // fetch requestUrl, passes through request URL
    fetch(requestUrl)
        // promise to return response
        .then(function (response) {
            return response.json();
        })
        // promise to run function with API data
        .then(function (data) {
            // console logs API data
            console.log(data);
            console.log(data[0].lat);
            
            $(headingContainer.text("Did you mean?"));
            $(cardContainer).addClass("hide");

            for (i =0; i < data.length; i++) {
                let cityBtn = `
                    <div class="d-grid gap-2 col-6 mx-auto">
                    <button class="btn btn-secondary btn-outline-dark p-4 m-4 btn-city" type="button">${data[i].name + ", " + data[i].state}</button>
                    </div>
                `;

                $(headingContainer).after(cityBtn);
            };

            $(".btn-city").on("click", function() {
                const lat = $(this).data.lat;
                const lon = $(this).data.lon;
        
                console.log(lon);
            });

            fetchWeather();
        });
};

function fetchWeather() {

    // // changes footer position
    // $("footer").css("position", "relative");

    // // removes hide class
    // $("h2").removeClass("hide");
    // $("div").removeClass("hide");

    // // variables to access different elements of card
    // let weatherIcon = $(".weather-icon");
    // let dates = $(".date");
    // let description = $(".description");
    // let temperature = $(".temperature");
    // let humidity = $(".humidity");
    // let windSpeed = $(".wind-speed");

    // // variables for new img src paths
    // let snowPath = "./images/snowing.png";
    // let rainPath = "./images/rain.png";
    // let cloudyPath = "./images/cloudy.png";
    // let partlyCloudyPath = "./images/partly-cloudy.png";
    // let fogPath = "./images/foggy.png";
    // let windPath = "./images/wind-and-cloud.png"
    // let sunnyPath = "./images/sunny.png"

    // // variable for resolvedAddress from API
    // resolvedAddress = data.resolvedAddress;
    // console.log(resolvedAddress);

    // // changes h1 to resolve address after search
    // $("#heading-container").text(resolvedAddress);

    // // updates current condition card with current weather conditions
    // $(dates).eq(0).text(data.days[0].datetime + " Time: " + data.currentConditions.datetime);
    // $(description).eq(0).text(data.currentConditions.conditions);
    // $(temperature).eq(0).text("Temp: " + data.currentConditions.temp + " °C");
    // $(humidity).eq(0).text("Humidity: " + data.currentConditions.humidity + " %");
    // $(windSpeed).eq(0).text("Wind Speed: " + data.currentConditions.windspeed + " Kph");

    // // condition statement to check icon from API then change img accordingly
    // if (data.currentConditions.icon == "snow") {
    //     $(weatherIcon).eq(0).attr("src", snowPath);
    // } else if (data.currentConditions.icon == "rain") {
    //     $(weatherIcon).eq(0).attr("src", rainPath);
    // } else if (data.currentConditions.icon == "cloudy") {
    //     $(weatherIcon).eq(0).attr("src", cloudyPath);
    // } else if (data.currentConditions.icon == "partly-cloudy-day") {
    //     $(weatherIcon).eq(0).attr("src", partlyCloudyPath);
    // } else if (data.currentConditions.icon == "partly-cloudy-night") {
    //     $(weatherIcon).eq(0).attr("src", partlyCloudyPath);
    // } else if (data.currentConditions.icon == "fog") {
    //     $(weatherIcon).eq(0).attr("src", fogPath);
    // } else if (data.currentConditions.icon == "wind") {
    //     $(weatherIcon).eq(0).attr("src", windPath);
    // } else {
    //     $(weatherIcon).eq(0).attr("src", sunnyPath);
    // }; 

    // // iteration to change next 5 cards with corresponding date/weather
    // for (i = 1; i < data.days.length; i++) {
    //     // updates future condition card with current weather conditions
    //     $(dates).eq(i).text(data.days[i].datetime);
    //     $(description).eq(i).text(data.days[i].description);
    //     $(temperature).eq(i).text("Temp: " + data.days[i].temp + " °C");
    //     $(humidity).eq(i).text("Humidity: " + data.days[i].humidity + " %");
    //     $(windSpeed).eq(i).text("Wind Speed: " + data.days[i].windspeed + " Kph");
    //     console.log(data.days[i].icon);

    //     // condition statement to check icon from API then change img accordingly
    //     if (data.days[i].icon == "snow") {
    //         $(weatherIcon).eq(i).attr("src", snowPath);
    //     } else if (data.days[i].icon == "rain") {
    //         $(weatherIcon).eq(i).attr("src", rainPath);
    //     } else if (data.days[i].icon == "cloudy") {
    //         $(weatherIcon).eq(i).attr("src", cloudyPath);
    //     } else if (data.days[i].icon == "partly-cloudy-day") {
    //         $(weatherIcon).eq(i).attr("src", partlyCloudyPath);
    //     } else if (data.days[i].icon == "partly-cloudy-night") {
    //         $(weatherIcon).eq(i).attr("src", partlyCloudyPath);
    //     } else if (data.days[i].icon == "fog") {
    //         $(weatherIcon).eq(i).attr("src", fogPath);
    //     } else if (data.days[i].icon == "wind") {
    //         $(weatherIcon).eq(i).attr("src", windPath);
    //     } else {
    //         $(weatherIcon).eq(i).attr("src", sunnyPath);
    //     }; 
    // };
}
//  calls addPreviousCity function
addPreviousCity();