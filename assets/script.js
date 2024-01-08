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

    $(".card-container").addClass("hide");
    $("h2").addClass("hide");

    // URL to use with API
    const requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + locationValue.val() + "&limit=5&appid=" + apiKey;

    console.log(weatherAPIFetch);
    // calls fetchWeather function, passes through requestUrl
    fetchLonLat(requestUrl);
};

// previousWeatherFetch function, adds event
function previousWeatherFetch(event) {

    $(".card-container").addClass("hide");
    $("h2").addClass("hide");

    // URL to use with API
    const requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + $(event.target).text() + "&limit=5&appid=" + apiKey;

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
                    <button class="btn btn-secondary btn-outline-dark p-4 m-4 btn-city" type="button" data-lat="${data[i].lat}" data-lon="${data[i].lon}">${data[i].name + ", " + data[i].state}</button>
                    </div>
                `;

                $(headingContainer).after(cityBtn);
            };

            fetchWeather();
        });
};

function fetchWeather() {

    $(".btn-city").on("click", function() {
        let lat = $(this).data("lat");
        let lon = $(this).data("lon");
        console.log(lon);
        console.log(lat);

        let weatherRequestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";

        fetch(weatherRequestUrl)
        // // promise to return response
       .then(function (response) {
            return response.json();
        })
        // // promise to run function with API data
        .then(function (data) {
        //     // console logs API data
            console.log(data);

        // removes hide class
        $(".btn-city").addClass("hide");
        $("h2").removeClass("hide");
        $("div").removeClass("hide");
        // changes footer position
        $("footer").css("position", "relative");

        // variables to access different elements of card
        let weatherIcon = $(".weather-icon");
        let dates = $(".date");
        let description = $(".description");
        let temperature = $(".temperature");
        let humidity = $(".humidity");
        let windSpeed = $(".wind-speed");

        // variables for new img src paths
        let snowDayPath = "https://openweathermap.org/img/wn/13d@2x.png";
        let snowNightPath = "https://openweathermap.org/img/wn/13n@2x.png";
        let showerRainDayPath = "https://openweathermap.org/img/wn/09d@2x.png";
        let showerRainNightPath = "https://openweathermap.org/img/wn/09n@2x.png";
        let rainDayPath = "https://openweathermap.org/img/wn/10d@2x.png";
        let rainNightPath = "https://openweathermap.org/img/wn/10n@2x.png";
        let brokenCloudsDayPath = "https://openweathermap.org/img/wn/04d@2x.png";
        let brokenCloudsNightPath = "https://openweathermap.org/img/wn/04n@2x.png";
        let fewCloudsDayPath = "https://openweathermap.org/img/wn/02d@2x.png";
        let fewCloudsNightPath = "https://openweathermap.org/img/wn/02n@2x.png";
        let scatteredCloudsDayPath = "https://openweathermap.org/img/wn/03d@2x.png";
        let scatteredCloudsNightPath = "https://openweathermap.org/img/wn/03n@2x.png";
        let mistDayPath = "https://openweathermap.org/img/wn/50d@2x.png";
        let mistNightPath = "https://openweathermap.org/img/wn/50n@2x.png";
        let thunderstormDayPath = "https://openweathermap.org/img/wn/11d@2x.png";
        let thunderstormNightPath = "https://openweathermap.org/img/wn/11n@2x.png";
        let clearDayPath = "https://openweathermap.org/img/wn/01d@2x.png"
        let clearNightPath = "https://openweathermap.org/img/wn/01n@2x.png"
        

        // changes h1 to resolve address after search
        $("#heading-container").text(data.city.name + ", " + data.city.country);

        // updates current condition card with current weather conditions
        $(dates).eq(0).text(data.list[0].dt_txt);
        $(description).eq(0).text(data.list[0].weather[0].description);
        $(temperature).eq(0).text("Temp: " + data.list[0].main.temp + " °C");
        $(humidity).eq(0).text("Humidity: " + data.list[0].main.humidity + " %");
        $(windSpeed).eq(0).text("Wind Speed: " + data.list[0].wind.speed + " Kph");

        // condition statement to check icon from API then change img accordingly
        if (data.list[0].weather[0].icon == "04d") {
            $(weatherIcon).eq(0).attr("src", brokenCloudsDayPath);
        } else if (data.list[0].weather[0].icon == "04n") {
            $(weatherIcon).eq(0).attr("src", brokenCloudsNightPath);
        } else if (data.list[0].weather[0].icon == "01d") {
            $(weatherIcon).eq(0).attr("src", clearDayPath);
        } else if (data.list[0].weather[0].icon == "01n") {
            $(weatherIcon).eq(0).attr("src", clearNightPath);
        } else if (data.list[0].weather[0].icon == "02d") {
            $(weatherIcon).eq(0).attr("src", fewCloudsDayPath);
        } else if (data.list[0].weather[0].icon == "02n") {
            $(weatherIcon).eq(0).attr("src", fewCloudsNightPath);
        } else if (data.list[0].weather[0].icon == "03d") {
            $(weatherIcon).eq(0).attr("src", scatteredCloudsDayPath);
        } else if (data.list[0].weather[0].icon == "03n") {
            $(weatherIcon).eq(0).attr("src", scatteredCloudsNightPath);
        } else if (data.list[0].weather[0].icon == "09d") {
            $(weatherIcon).eq(0).attr("src", showerRainDayPath);
        } else if (data.list[0].weather[0].icon == "09n") {
            $(weatherIcon).eq(0).attr("src", showerRainNightPath);
        } else if (data.list[0].weather[0].icon == "10d") {
            $(weatherIcon).eq(0).attr("src", rainDayPath);
        } else if (data.list[0].weather[0].icon == "10n") {
            $(weatherIcon).eq(0).attr("src", rainNightPath);
        } else if (data.list[0].weather[0].icon == "11d") {
            $(weatherIcon).eq(0).attr("src", thunderstormDayPath);
        } else if (data.list[0].weather[0].icon == "11n") {
            $(weatherIcon).eq(0).attr("src", thunderstormNightPath);
        } else if (data.list[0].weather[0].icon == "13d") {
            $(weatherIcon).eq(0).attr("src", snowDayPath);
        } else if (data.list[0].weather[0].icon == "13n") {
            $(weatherIcon).eq(0).attr("src", snowNightPath);
        } else if (data.list[0].weather[0].icon == "50d") {
           $(weatherIcon).eq(0).attr("src", mistDayPath);
        } else {
            $(weatherIcon).eq(0).attr("src", mistNightPath);
        };

        // iteration to change next 5 cards with corresponding date/weather
        for (i = 1; i < data.list.length; i++) {
        // updates future condition card with current weather conditions
            $(dates).eq(i).text(data.list[i].dt_txt);
            $(description).eq(i).text(data.list[i].weather[0].description);
            $(temperature).eq(i).text("Temp: " + data.list[i].main.temp + " °C");
            $(humidity).eq(i).text("Humidity: " + data.list[i].main.humidity + " %");
            $(windSpeed).eq(i).text("Wind Speed: " + data.list[i].wind.speed + " Kph");

                    // condition statement to check icon from API then change img accordingly
        if (data.list[i].weather[0].icon == "04d") {
            $(weatherIcon).eq(i).attr("src", brokenCloudsDayPath);
        } else if (data.list[i].weather[0].icon == "04n") {
            $(weatherIcon).eq(i).attr("src", brokenCloudsNightPath);
        } else if (data.list[i].weather[0].icon == "01d") {
            $(weatherIcon).eq(i).attr("src", clearDayPath);
        } else if (data.list[i].weather[0].icon == "01n") {
            $(weatherIcon).eq(i).attr("src", clearNightPath);
        } else if (data.list[i].weather[0].icon == "02d") {
            $(weatherIcon).eq(i).attr("src", fewCloudsDayPath);
        } else if (data.list[i].weather[0].icon == "02n") {
            $(weatherIcon).eq(i).attr("src", fewCloudsNightPath);
        } else if (data.list[i].weather[0].icon == "03d") {
            $(weatherIcon).eq(i).attr("src", scatteredCloudsDayPath);
        } else if (data.list[i].weather[0].icon == "03n") {
            $(weatherIcon).eq(i).attr("src", scatteredCloudsNightPath);
        } else if (data.list[i].weather[0].icon == "09d") {
            $(weatherIcon).eq(i).attr("src", showerRainDayPath);
        } else if (data.list[i].weather[0].icon == "09n") {
            $(weatherIcon).eq(i).attr("src", showerRainNightPath);
        } else if (data.list[i].weather[0].icon == "10d") {
            $(weatherIcon).eq(i).attr("src", rainDayPath);
        } else if (data.list[i].weather[0].icon == "10n") {
            $(weatherIcon).eq(i).attr("src", rainNightPath);
        } else if (data.list[i].weather[0].icon == "11d") {
            $(weatherIcon).eq(i).attr("src", thunderstormDayPath);
        } else if (data.list[i].weather[0].icon == "11n") {
            $(weatherIcon).eq(i).attr("src", thunderstormNightPath);
        } else if (data.list[i].weather[0].icon == "13d") {
            $(weatherIcon).eq(i).attr("src", snowDayPath);
        } else if (data.list[i].weather[0].icon == "13n") {
            $(weatherIcon).eq(i).attr("src", snowNightPath);
        } else if (data.list[i].weather[0].icon == "50d") {
           $(weatherIcon).eq(i).attr("src", mistDayPath);
        } else {
            $(weatherIcon).eq(i).attr("src", mistNightPath);
        };
        };

    });
});
};
//  calls addPreviousCity function
addPreviousCity();