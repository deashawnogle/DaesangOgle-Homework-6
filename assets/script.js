//global vaiables
const apiKey = "7ba4078f3e5e2434eebb3325598ec14b";
const searchButton = $('#searchButton');
const cities = localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : []
const fiveDayKey = "1221a358bdfdc0f4c7620820b753e607"
const uvIndexApiKey = "e2ccdb6ba0e97a2de8ffa8f973f03002"

searchButton.on("click", function(){
    const cityName = $("#search-input").val().trim()
    display(cityName)
});

function display(cityName) {
    
    let requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: requestURL,
        method: "GET"
    }).then(function(response) {


        let iconCode = response.weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/wn/"+ iconCode + "@2x.png"

        $(".name").text(response.name);
        $(".date").text(new Date(response.dt*1000).toLocaleDateString());
        $(".img").attr('src', iconUrl);
        $(".temp").text("Temperature (F): " + response.main.temp + "F");
        $(".humid").text("Humidity: " + response.main.humidity + " %");
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");        

        let lat = response.coord.lat
        let lon = response.coord.lon

        fivedays(lat,lon);
    });

}

function fivedays (lat,lon) {
    let requestURL5 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: requestURL5,
        method: "GET"
    }).then(function(response) {

        console.log (response)
        for (let i = 1; i < response.daily.length - 2; i++) {

        let iconCode = response.daily[i].weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/wn/"+ iconCode + "@2x.png"

        $(".date" + i).text(new Date(response.daily[i].dt*1000).toLocaleDateString());
        $(".dateimg" + i).attr('src', iconUrl);
        $(".dateTemp" + i).text("Temperature (F): " + response.daily[i].temp.day + "F");
        $(".dateHumid" + i).text("Humidity: " + response.daily[i].humidity + " %");
        $(".dateWind" + i).text("Wind Speed: " + response.daily[i].wind_speed + " MPH");   
    };
});
}




// function history() {
//     console.log("button clicked")
//     $("#history").empty();

//     for (var i = 0; i < cities.length; i++) {
//     let add = $("<button>");
//     add.addClass("city");
//     add.attr("data-name", cities[i]);
//     add.text(cities[i]);
//     $("#history").append(add);
//     }
// };

// $("#search-city").on("click", function(event) {
//     event.preventDefault();
//     let city = $("#searchButton").val().trim();
//     cities.push(city);
//     localStorage.setItem("history", JSON.stringify(cities))
//     historyButtons();
//     display();
// });

// $(document).on("click", ".city", (e)=>display(e.target.textContent));

// searchButtons();

//display weather current weather





//function uvIndex (lon, lat)

//let uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey + "&lat=" + lat + "&lon=" + lon;



// $(document).on("click", ".city", (e)=>display(e.target.textContent));

// historyButtons();


// function GetInfo () {
//     const cityName = $('cityName');
//     cityName.innerHTML = "--" + city.value + "--"
// }

// fetch(requestURL)
//     .then(response => response.JSON())
//     .then(function (data) {

//         for (let i = 0; i < 5; i++) {
//             document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png"
//         }
//         for (let i = 0; i < 5; i++) {
//             document.getElementById("date" + (i+1) + "Temp").innerHTML = "Temp" + Number(data.list[i].main.temp + "F");
//         }
//         for (let i = 0; i < 5; i++) {
//             document.getElementById("date" + (i+1) + "Humid").innerHTML = "Humid" + Number(data.list[i].main.humidity + "h");
//         }
//         for (let i = 0; i < 5; i++) {
//             document.getElementById("date" + (i+1) + "Wind").innerHTML = "Wind" + Number(data.list[i].wind.speed + "mph");
//         }


        // let iconCode = response.icon;
        // let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

        // $(".name").text(response.name);
        // $(".date").text(new Date(response.dt*1000).toLocaleDateString());
        // $(".temperature").text("Temperature (F): " + response.main.temp + "F");
        // $(".humidity").text("Humidity: " + response.main.humidity + " %");
        // $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        // $(".icon").attr('src', iconUrl);
    
        
    


// function display(city = $("#search-input").val().trim()) {
//     // var city = $(this).attr("data-name");
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//           }).then(function(response) {
    
//             var iconcode = response.weather[0].icon;
//             var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    
//             $(".name").text(response.name);
//             $(".date").text(new Date(response.dt*1000).toLocaleDateString());
//             $(".temperature").text("Temperature (F): " + ((response.main.temp- 273.13) * 1.80 +32).toFixed(2));
//             $(".humid").text("Humidity: " + response.main.humidity + " %");
//             $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
//             $(".icon").attr('src', iconurl);
    
//             uvindex(response.coord.lon,response.coord.lat);
//             fivedays(city);
//           });
//     };

// fetch(queryURL)
//     .then(function (response) {
//         return response.json(); })
        
//     .then(function (data) {
//         console.log('stuff from API',data)
//     })

// let resultArea = $('#resultArea');
// let result = $('#result');
// let history = localStorage.getItem("history");

// function GetInfo() {
//     const newName = document.getElementById("search-input");
//     const cityName = documnet.getElementById("cityName");
//     cityName.innerHTML = "--" + newName.value + "--"
// }


//"api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&unit=imeprial"


//function for search button
// $('#serachButton').click(function (event) {
//     event.preventDefault()
//     todayContent.text('')
//     resultArea.text('')
//     getCity()
// })