<script>
        const apiKey = "d9e9456c463366cb13d87ea066385a95";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        
        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");
        
        async function checkWeather(city) {
            try {
                const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                if (data.cod === '404') {
                    document.querySelector(".error").style.display = "block";
                    document.querySelector(".weather").style.display = "none";
                } else {
                    document.querySelector(".city").innerHTML = data.name;
                    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
                    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
                    
                    switch (data.weather[0].main) {
                        case "Clouds":
                            console.log("Weather condition: Clouds");
                            weatherIcon.src = "images/clouds.png";
                            break;
                        case "Clear":
                            console.log("Weather condition: Clear");
                            weatherIcon.src = "images/clear.png";
                            break;
                        case "Rain":
                            console.log("Weather condition: Rain");
                            weatherIcon.src = "images/rain.png";
                            break;
                        case "Drizzle":
                            console.log("Weather condition: Drizzle");
                            weatherIcon.src = "images/drizzle.png";
                            break;
                        case "Mist":
                            console.log("Weather condition: Mist");
                            weatherIcon.src = "images/mist.png";
                            break;
                        default:
                            console.log("Weather condition: Unknown");
                            weatherIcon.src = ""; // Clear previous icon
                            document.querySelector(".weather").style.display = "none";
                            document.querySelector(".error").innerHTML = "Weather condition icon not available";
                            document.querySelector(".error").style.display = "block";
                            break;
                    }
                    
                    document.querySelector(".weather").style.display = "block";
                    document.querySelector(".error").style.display = "none";
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
            }
        }
        
        searchBtn.addEventListener("click", () => {
            checkWeather(searchBox.value);
        });
        
        // Initial call to display weather for a default city
        checkWeather(); // Replace with the default city you want to display initially
        
    </script>
