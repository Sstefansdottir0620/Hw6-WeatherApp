// const axios = require("axios");

// axios
//   .get("https://www.omdbapi.com/?t=The%20Matrix&apikey=trilogy")
//   .then(function(res) {
//     console.log(res.data);
//   });
const weatherImages = {clear: "./img/clear.svg", cloudy: "./img/cloudy.svg", rain:"./img/Rain.svg"}
let fiveDayKey = "20b2f43df59861f0618d096f878660bb";
let apiKey = "b8a56e4414d7b929c321b9dffcb34c7f";
let response = "";
$(searchSubmit).on("click", function(){
  event.preventDefault();
  search();
})
function search(){
  let userInput = $("#cityInput").val();

	let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=b8a56e4414d7b929c321b9dffcb34c7f`;
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function search(response) {
    console.log(response);
    
    // Create CODE HERE to transfer content to HTML
    $("#currentCity").text(response.name);
    $("#current-day-image").attr()
    $("#currentTemp").text(response.main.temp);
    $("#currentHumidity").text(response.main.humidity);
    $("#currentWind").text(response.wind.speed);
    
     UVrequest(response.coord.lon, response.coord.lat);
     FiveDayForecast(userInput);
 
  });
};
function printForeCast(foreCastArray){
  for (let i = 0; i <= foreCastArray.length; i++) {
    const array = ["first", "second", "third", "fourth", "fifth"]
  
  $(`#${array[i]}-day`).text(foreCastArray[i].dt_txt.split(" ")[0].toString());
  $(`#${array[i]}-day-temp`).text((Math.floor(foreCastArray[i].main.temp - 273.15)*1.80 +32));
  $(`#${array[i]}-day-humid`).text(foreCastArray[i].main.humidity);
    console.log(foreCastArray[i].weather[0].main)
  switch (foreCastArray[i].weather[0].main) {
    case "Clear":
      $(`#${array[i]}-day-image`).attr("src", weatherImages.clear);
      break;
    case "Clouds":
      $(`#${array[i]}-day-image`).attr("src", weatherImages.cloudy);
      break;
    case "Rain":
      $(`#${array[i]}-day-image`).attr("src", weatherImages.rain);
      break;
    default:
      $(`#${array[i]}-day-image`).attr("src", weatherImages.clear);
      break;
  }

  }
  // var imgURL = response.Poster;

  // // Creating an element to hold the image
  // var image = $("<img>").attr("src", imgURL);

  // // Appending the image
  // movieDiv.append(image);

}

function FiveDayForecast(cityName){
let queryFiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${fiveDayKey}`;
$.ajax({
  url: queryFiveDayURL,
  method: "GET"
}).then(response => {
  let foreCast = [response.list[3], response.list[11], response.list[19], response.list[27], response.list[35]];
  // $("#first-day").text(response);
  // let firstDay = response.value;
  // (Math.floor(response.main.temp - 273.15)*1.80 +32);
  printForeCast(foreCast);
})
};

function UVrequest(lon, lat){
  let queryUV = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
  $.ajax({
    url: queryUV,
    method: "GET"
  }).then(response =>{
    $("#currentUVindex").text(response.value);
    let UVindex = response.value;
    if (UVindex >= 5) {
      $("#currentUVindex").attr("class", "btn btn-danger")
    } 
    else{
      $("#currentUVindex").attr("class", "btn btn-success")
    }
    
    // localStorage.setItem("UVindex", JSON.stringify(UVindex));
    
    // var testStorage = JSON.parse(localStorage.getItem("UVindex"));
    // console.log(testStorage);

  })


}






//       // Transfer content to HTML
//       $(".city").html("<h1>" + response.name + " Weather Details</h1>");
//       $(".wind").text("Wind Speed: " + response.wind.speed);
//       $(".humidity").text("Humidity: " + response.main.humidity);
//       $(".temp").text("Temperature (F) " + response.main.temp);

      

    