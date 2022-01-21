//global vaiables
const apiKey = "7ba4078f3e5e2434eebb3325598ec14b";
const searchButton = $('#searchButton');
const historyCity = localStorage.getItem("searchHistory") ? JSON.parse(localStorage.getItem("searchHistory")) : []


//function for Searh click / 
searchButton.on("click", function () {
    const cityName = $("#search-input").val().trim()
    historyCity.push(cityName)
    localStorage.setItem("searchHistory", JSON.stringify(historyCity))

    display(cityName)
});


//local storage for search History
function displayCity() {
    const searchHistoryList = $(".searchHistoryList")
    searchHistoryList.empty();
    for (let i = 0; i < historyCity.length; i++) {
        searchHistoryList.append(`<li><button class='pastSearch'>${historyCity[i]}</button></li>`)

    }
}

displayCity();

//search history list button 
$(document).on("click",".pastSearch",  function(event) {
    event.preventDefault();
    console.log('PAST SEARCH CLICKED!!', $(this).text())
    let city = $(this).text()
    display(city);
});

$(document).on("click", ".name", (e)=>display(e.target.textContent));

//Display current weather page from API with AJAX
function display(cityName) {

    let requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: requestURL,
        method: "GET"
    }).then(function (response) {

        
        let iconCode = response.weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

        $(".name").text(response.name);
        $(".date").text(new Date(response.dt * 1000).toLocaleDateString());
        $(".img").attr('src', iconUrl);
        $(".temp").text("Temp (F): " + response.main.temp + "F");
        $(".humid").text("Humid: " + response.main.humidity + " %");
        $(".wind").text("Wind: " + response.wind.speed + " MPH");


        const lat = response.coord.lat
        const lon = response.coord.lon

        fivedays(lat, lon);
    });

}


//Display fivdays forcast by ajax
function fivedays(lat, lon) {
    let requestURL5 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: requestURL5,
        method: "GET"
    }).then(function (response) {
        // if else 

        console.log('uvi index before if!!!', response.current.uvi)
        if(parseInt(response.current.uvi) > 2) {
            $(".uv").removeClass('codeGreen')
            $(".uv").addClass('codeRed')
        } else {
            $(".uv").removeClass('codeRed')
            $(".uv").addClass('codeGreen')
        }

        $(".uv").text("UV Index: " + response.current.uvi);

        console.log(response)
        for (let i = 1; i < response.daily.length - 2; i++) {

            let iconCode = response.daily[i].weather[0].icon;
            let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

            $(".date" + i).text(new Date(response.daily[i].dt * 1000).toLocaleDateString());
            $(".dateimg" + i).attr('src', iconUrl);
            $(".dateTemp" + i).text("Temp (F): " + response.daily[i].temp.day + "F");
            $(".dateHumid" + i).text("Humid: " + response.daily[i].humidity + " %");
            $(".dateWind" + i).text("Wind: " + response.daily[i].wind_speed + " MPH");
        };
        displayCity();
    });
}

// function uvIndex() {
//     let uvIndexPoint = $(".uv")

//     if(uvIndexPoint < 3) {
//         $("#result").css({ 'background-color': 'green'});
//       
//     else if {
//         $("#result").css({ 'background-color': 'yellow'});
//         
//         }
//     };
// };