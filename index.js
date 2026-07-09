

const weatherForm=document.querySelector('.weatherForm');
const cityInput=document.querySelector('.cityInput');
const card=document.querySelector('.card');
const apiKey="8ada5927a4344835cb580e8d06a07559";


weatherForm.addEventListener('submit',async event =>{

    event.preventDefault();

    card.style.display="none"; // Hide the card initially

    const city=cityInput.value;

    if(city){
        card.style.display="flex";
        card.innerHTML="<p class='loading'> ⌛Loading...</p>";
        try{

            const weatherData=await getWeatherData(city);



            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay of 1 second
            displayWeatherInfo(weatherData);

        }
        catch(error){
            console.error(error);
            displayError(error);

        }

    }
    else{
        displayError('Please enter a city name.');
    }

});

async function getWeatherData(city){

    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response=await fetch(apiUrl);

    if(!response.ok){
        throw new Error('Failed to fetch weather data.');
    }
   

    return await response.json();




}

function displayWeatherInfo(data){                 //object destructuring

    const { name: city,
         main: { temp,humidity }, 
         weather: [{ description,id }] } = data;


card.textContent='';

setTimeout(()=>{
    card.style.display="flex";
},500);

const cityDisplay=document.createElement('h1');
const tempDisplay=document.createElement('p');
const humidityDisplay=document.createElement('p');
const descDisplay=document.createElement('p');
const weatherEmoji=document.createElement('p');

cityDisplay.textContent=city;
cityDisplay.classList.add("cityDisplay");
tempDisplay.textContent=`Temperature: ${temp}°C`;
tempDisplay.classList.add("tempDisplay");

humidityDisplay.textContent=`Humidity: ${humidity}%`;
humidityDisplay.classList.add("humidityDisplay");                      

descDisplay.textContent=`Description: ${description}`;
descDisplay.classList.add("descDisplay");

weatherEmoji.textContent=getWeatherEmoji(id);
weatherEmoji.classList.add("weatherEmoji");




card.appendChild(cityDisplay);                                      //add elements to the card
card.appendChild(tempDisplay);
card.appendChild(humidityDisplay);
card.appendChild(descDisplay);
card.appendChild(weatherEmoji);



}


function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId>=200 && weatherId<300) :

            return '⛈️'; // Thunderstorm
        case (weatherId>=300 && weatherId<400) :    
         
              return '🌦️'; // Drizzle

        case (weatherId>=500 && weatherId<600) :
            return '🌧️'; // Rain
  
        case (weatherId>=600 && weatherId<700) :
            return '❄️'; // Snow
        
        case (weatherId>=700 && weatherId<800) :
            return '🌫️'; // Atmosphere
        case (weatherId===800) :
            return '☀️'; // Clear
         
        case (weatherId>800 && weatherId<900) :
            return '☁️'; // Clouds
        default:
            return '🌈'; // Default emoji for unknown weather conditions
    }



}

function displayError(message){
    const errorDisplay=document.createElement('p');
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");

card.textContent='';

setTimeout(() => {
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}, 500);
}


