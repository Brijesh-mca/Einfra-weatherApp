document.getElementById('weather-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const city = document.getElementById('city').value;
  const weatherResult = document.getElementById('weather-result');
  weatherResult.style.display = 'none'; // Hide results initially

  try {
    // Fetch weather data
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=248bc97c3032f4d417d5fba83ff0d2bf`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();

    let tempCelsius = kelvin(data.main.temp);
    let tempFahrenheit = celsiusToFahrenheit(tempCelsius);
    let isCelsius = true;

    // Extract weather condition
    let weatherCondition = data.weather[0].main.toLowerCase();
    changeBackground(weatherCondition);

    // Generate icon URL
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Update UI with weather data
    document.getElementById('iconCol').innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
    document.getElementById('city-name').textContent = `Weather in ${data.name}`;
    document.getElementById('temperature').textContent = `Temperature: ${tempCelsius.toFixed(2)} °C`;
    document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('Wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    
    // Add toggle button
    const toggleButton = document.getElementById('toggle-temp');
    toggleButton.style.display = 'block';
    toggleButton.onclick = function () {
      isCelsius = !isCelsius;
      document.getElementById('temperature').textContent = `Temperature: ${isCelsius ? tempCelsius.toFixed(2) + ' °C' : tempFahrenheit.toFixed(2) + ' °F'}`;
    };

    weatherResult.style.display = 'block';
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
});

// Convert Kelvin to Celsius
function kelvin(temp) {
  return temp - 273.15;
}

// Convert Celsius to Fahrenheit
function celsiusToFahrenheit(temp) {
  return (temp * 9/5) + 32;
}

// Function to change the background based on weather condition
function changeBackground(condition) {
  let backgroundImage = "";

  if (condition.includes("clear")) {
    backgroundImage = "url('images/sunny.jpg')";
  } else if (condition.includes("cloud")) {
    backgroundImage = "url('images/cloudy.jpg')";
  } else if (condition.includes("rain")) {
    backgroundImage = "url('images/rainy.jpg')";
  } else if (condition.includes("thunderstorm")) {
    backgroundImage = "url('images/thunderstorm.jpg')";
  } else if (condition.includes("snow")) {
    backgroundImage = "url('images/snowy.jpg')";
  } else if (condition.includes("mist") || condition.includes("fog") || condition.includes("haze")) {
    backgroundImage = "url('images/haze.jpg')";
  } else {
    backgroundImage = "url('images/sunny.jpg')"; // Default background
  }

  document.body.style.backgroundImage = backgroundImage;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}



// here goes Animation of gsap

gsap.from("#box",{
  duration:0.7,
  delay:1,
  scale:0,
})

//load event

window.onload = function() {
  setTimeout(() => {
      document.getElementById("mainCon").style.display = "none";

  }, 2000); // 2 seconds delay
};