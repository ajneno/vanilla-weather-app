  function formatDate(timestamp){
let date= new Date (timestamp)
let hours=date.getHours();
if (hours<10){

hours=`0 ${hours}`;
}

let minutes=date.getMinutes ();
if (minutes<10){

  minutes=`0${minutes}`;
}


let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]
let day=days[date.getDay()];
return `${day} ${hours}:${minutes}`
  }
  
  
  
  
  function displayTemperature(response){
    
let temperatureElement= document.querySelector("#temperature");
let cityElement= document.querySelector("#city");
let descriptionElement=document.querySelector ("#description");
let humidityElement=document.querySelector ("#humidity");
let windElement=document.querySelector ("#wind");
let dateElement=document.querySelector ("#date");
let iconElement=document.querySelector ("#icon")

celsiusTemperature = response.data.main.temp;

temperatureElement.innerHTML=Math.round(celsiusTemperature);
cityElement.innerHTML=response.data.name;
descriptionElement.innerHTML=response.data.weather[0].description;
humidityElement.innerHTML=response.data.main.humidity;
windElement.innerHTML=response.data.wind.speed;
dateElement.innerHTML=formatDate (response.data.dt*1000)
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
iconElement.setAttribute("alt", response.data.weather[0].description)

  }

function displayForecast (responset){
  
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = ` 
<div class="col-2">
    <h3>
      Sun
    </h3>
    <img src="https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png" alt="" />
    <div class="weather-forecast-temperature">
      <strong> 22º </strong> 17º
    </div>
  </div>`
console.log (response.data.list[0] ) ;

}

function search(city){

let units = "metric";

  let apiKey = "34ab83f78081d8121e2f9a19e2f4db72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey} &units=${units}`;
  axios.get(apiUrl).then (displayForecast) ;
}

  

  function handleSubmit(event){
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search (cityInputElement.value);

  }

function showfahrenheitTemperature(event ) {
event.preventDefault ();
let temperatureElement = document.querySelector("#temperature");
// remove the active class the celsius link
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemperature= (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round (fahrenheitTemperature);

}

function showcelsiusTemperature(event){
event.preventDefault();
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round (celsiusTemperature);


}


let celsiusTemperature = null;
  let form=document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", showfahrenheitTemperature);

  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", showcelsiusTemperature);

search("New York");
