

import React, { useEffect, useState, useRef } from 'react'
import "./Weather.css"

import searchIcon from "../assets/search.svg"

import clear_d_day from "../assets/01d.svg"
import clear_n_day from "../assets/01n.svg"
import partly_d_cloudy from "../assets/02d.svg"
import partly_n_cloudy from "../assets/02n.svg"
import d_cloudy from "../assets/03d.svg"
import n_cloudy from "../assets/03n.svg"
import d_overcast from "../assets/04d.svg"
import n_overcast from "../assets/04n.svg"
import rain_d from "../assets/09d.svg"
import rain_N from "../assets/09n.svg"
import rain_d10 from "../assets/10d.svg"
import rain_N10 from "../assets/10n.svg"
import thunderstorm_d from "../assets/11d.svg"
import thunderstorm_n from "../assets/11n.svg"
import snow_d from "../assets/13d.svg"
import snow_n from "../assets/13n.svg"
import fog_d from "../assets/50d.svg"
import fog_n from "../assets/50n.svg"
import humidity from "../assets/humidity.png"
import wind from "../assets/wind-beaufort-1.svg"


const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_d_day,
        "01n": clear_n_day,
        "02d": partly_d_cloudy,
        "02n": partly_n_cloudy,
        "03d": d_cloudy,
        "03n": n_cloudy,
        "04d": d_overcast,
        "04n": n_overcast,
        "09d": rain_d,
        "09n": rain_N,
        "10d": rain_d10,
        "10n": rain_N10,
        "11d": thunderstorm_d,
        "11n": thunderstorm_n,
        "13d": snow_d,
        "13n": snow_n,    
        "50d": fog_d,    
        "50n": fog_n,    
    }

    const search = async (city) => {

        if(city === "") {
            alert("Enter City name");
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if(data.cod === "404" ) {
                alert("City not found");
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_d_day
            setWeatherData(
                {
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    temperature: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon
                }
            )

        } catch (error) {
            setWeatherData(false);
        }
    }
    useEffect( () => {
        search("London")
    }, [])

  return (
    <div className='weather'>
        <div className='search-weather'>
            <input ref={inputRef} type="text" placeholder='search city...' onKeyDown={(e) => { 
                if( e.key === "Enter") {
                    search(inputRef.current.value)}} 
                    }/>
            <img className='search-img' src={searchIcon} alt='Search Icon'onClick={() => search(inputRef.current.value)}/>
        </div>

        {weatherData? <>
        <img src={weatherData.icon} alt='' className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature} °c</p>
        <p className='location'>{weatherData.location}</p>

        <div className="weather-data">
            
            <div className="col">
                <img src={humidity} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            
            <div className="col">
                <img className='windIcon' src={wind} alt="" />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>

        </div>
        </> : <></> }


    </div>
  )
}

export default Weather