const updateStatusText = document.getElementById("update-status");
const updateLocationText = document.getElementById("update-location");
const tempertureText = document.getElementById("Temperature");
const windText = document.getElementById("Wind");
const humidityText = document.getElementById("Humidity");

const form = document.getElementById("form")
const iconImage = document.getElementById("IconHere")

const APIKEY = "1f57c23d0aa3cfdb7f2d812e9dc8aafb";

async function getWeatherData(city)
{
    try 
    {
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`);

        const data = await result.json();

        const {main, weather, wind, sys} = data;
        
        updateStatusText.textContent = `${weather[0].main}`;
        updateLocationText.textContent = `${data.name}, ${sys.country}`;

        windText.textContent = `${wind.speed}mph`;
        tempertureText.textContent = `${Math.round(main.temp)}°C`;
        humidityText.textContent = `${main.humidity}%`;
    
        addWeatherIcon(weather);
    } 
    catch (e) 
    {
        console.log("Failed to fetch the weather API");
    }
}

form.addEventListener("submit", e =>
{
    e.preventDefault();

    const city = search.value;

    if(isNaN(city))
    {
        getWeatherData(city);
    }
    else
    {
        search.value = "Invalid Entry!";
    }
})

function addWeatherIcon(weather)
{
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("weatherIcon");
    
    iconDiv.innerHTML = `<img src="https://api.openweathermap.org/img/w/${weather[0].icon}.png"/>`;

    iconImage.innerHTML = "";
    iconImage.appendChild(iconDiv);
}