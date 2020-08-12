var forecast = "";
function retrieveLocalStorage () {
    var userInput = JSON.parse(localStorage.getItem("userInput"));
    console.log(userInput)
    $("#cityInput").val(userInput);
    getWeather(userInput);
}
$("#searchButton").on("click", function(){
    event.preventDefault();
    var userInput = $("#cityInput").val().trim();
    localStorage.setItem("userInput", JSON.stringify(userInput));
    console.log(userInput)
    getWeather(userInput);
})
function getWeather(userInput) {
    var APIKey = "9306210e5aa1d5c49d6ec3c9a210d50f";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKey;
    const forecasts = $("#forecasts");
                function clear(forecasts) {
                    $("#forecasts").html("");
                }
                clear();
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        const currentDate = new Date(response.dt * 1000);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        let weatherPic = response.weather[0].icon;
        $("#currentPic").attr("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
        $("#currentPic").attr("alt",response.weather[0].description);
        $("#cityName").html("<h3>" + response.name + " " + month + "/" + day +"/" + year + "</h3>")
        $("#temperature").text("Temperature: " + ((response.main.temp - 273.15) * 1.80 + 32).toFixed(1));
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#windSpeed").text("Wind Speed: " + response.wind.speed);

        function getUVIndex(lat, lon){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=5d388c274c7d1e9166f372df494a3b83",
                method: "GET"
            }).then(function(response){
                var uvIndex = response.value;
                if (uvIndex < 6) {
                    $("#uvIndex").css("background", "green")
                }
                else if (uvIndex > 8) {
                    $("#uvIndex").css("background", "red")
                }
                else {
                    $("#uvIndex").css("background", "orange")
                }
                $("#uvIndex").text("UV Index: " + response.value)
            });
        } 

        function getFive(cityID){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=5d388c274c7d1e9166f372df494a3b83",
                method: "GET"
            }).then(function(response){
                
                for (i=0; i < 5; i++) {
                    const forecastIndex = i * 8 + 4;
                    const forecastDate = new Date(response.list[forecastIndex].dt * 1000);
                    const forecastDay = forecastDate.getDate();
                    const forecastMonth = forecastDate.getMonth() + 1;
                    const forecastYear = forecastDate.getFullYear();
                    const forecastDates = $("<p>");
                    forecastDates.text(forecastMonth + "/" + forecastDay + "/" + forecastYear);
                    var forecast = $("<div>")
                    forecast.attr("class", "col forecast bg-primary text-white ml-3 mb-3 rounded");
                    forecast.append(forecastDates)
                    const forecastWeather = $("<img>");
                    forecastWeather.attr("src","https://openweathermap.org/img/wn/" + response.list[forecastIndex].weather[0].icon + "@2x.png");
                    forecastWeather.attr("alt",response.list[forecastIndex].weather[0].description);
                    forecast.append(forecastWeather);
                    const forecastTemp = $("<p>");
                    forecastTemp.text("Temp: " + ((response.list[forecastIndex].main.temp - 273.15) * 1.80 + 32).toFixed(1));
                    forecast.append(forecastTemp);
                    const forecastHumidity = $("<p>");
                    forecastHumidity.text("Humidity: " + response.list[forecastIndex].main.humidity + "%");
                    
                    forecast.append(forecastHumidity);
                    forecasts.append(forecast);                   
                    }
            });
        }
        getFive(response.id)
        getUVIndex(response.coord.lat, response.coord.lon)
        var button = $("<button>");
        button.text(response.name);
        button.addClass("ml-10 savedButton");
        $("#newButton").append(button, "<br>");
    })
}

$("#newButton").on("click", ".savedButton", function(){
    const thisButton = $(this).text();
    cityID = thisButton;
    var APIKey = "9306210e5aa1d5c49d6ec3c9a210d50f";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + thisButton + "&appid=" + APIKey;
    const forecasts = $("#forecasts");
                function clear(forecasts) {
                    $("#forecasts").html("");
                }
                clear();
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log(response)
        const currentDate = new Date(response.dt * 1000);
        console.log(currentDate);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        let weatherPic = response.weather[0].icon;
        $("#currentPic").attr("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
        $("#currentPic").attr("alt",response.weather[0].description);
        $("#cityName").html("<h3>" + response.name + "</h3>")
        $("#temperature").text("Temperature: " + ((response.main.temp - 273.15) * 1.80 + 32).toFixed(1));
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#windSpeed").text("Wind Speed: " + response.wind.speed);


        function getUVIndex(lat, lon){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=5d388c274c7d1e9166f372df494a3b83",
                method: "GET"
            })
            .then(function(response){
                console.log(response.value);
                $("#uvIndex").text("UV Index: " + response.value)
            });
        }function getFive(cityID){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=5d388c274c7d1e9166f372df494a3b83",
                method: "GET"
            }).then(function(response){
                console.log(response);
                
                for (i=0; i < 5; i++) {
                    const forecastIndex = i * 8 + 4;
                    const forecastDate = new Date(response.list[forecastIndex].dt * 1000);
                    const forecastDay = forecastDate.getDate();
                    const forecastMonth = forecastDate.getMonth() + 1;
                    const forecastYear = forecastDate.getFullYear();
                    const forecastDates = $("<p>");
                    forecastDates.text(forecastMonth + "/" + forecastDay + "/" + forecastYear);
                    console.log(forecastDates)
                    var forecast = $("<div>")
                    forecast.attr("class", "col forecast bg-primary text-white ml-3 mb-3 rounded");
                    forecast.append(forecastDates)
                    console.log(forecast)
                    const forecastWeather = $("<img>");
                    forecastWeather.attr("src","https://openweathermap.org/img/wn/" + response.list[forecastIndex].weather[0].icon + "@2x.png");
                    forecastWeather.attr("alt",response.list[forecastIndex].weather[0].description);
                    forecast.append(forecastWeather);
                    const forecastTemp = $("<p>");
                    forecastTemp.text("Temp: " + ((response.list[forecastIndex].main.temp - 273.15) * 1.80 + 32).toFixed(1));
                    forecast.append(forecastTemp);
                    const forecastHumidity = $("<p>");
                    forecastHumidity.text("Humidity: " + response.list[forecastIndex].main.humidity + "%");
                    forecast.append(forecastHumidity);
                    forecasts.append(forecast);                   
                    }
            });
        }
        getFive(response.id)
        getUVIndex(response.coord.lat, response.coord.lon)
    })
})
retrieveLocalStorage();

// $("#clearBtn").on("click", function() {
//     $("newButton").empty();
// })