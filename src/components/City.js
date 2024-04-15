// import React from 'react';
import './City.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function City() {
 const { cityName } = useParams();
    const [cityData, setCityData] = useState(null);

    useEffect(() => {
        const fetchCityData = async () => {
            try {
                const cityD = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=679e473191c8d6ad799d26c7e8a8c9b8`;
                const response = await fetch(cityD);
                const data = await response.json();
                setCityData(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCityData();
    }, [cityName]);

    if (!cityData) {
        return <div>Loading...</div>;
    }
       const kelvinToCelsius = (kelvin) => {
        return kelvin - 273.15;
    };
    return (

        <div className='temp'>
            
            <p>
                 {kelvinToCelsius(cityData.main.temp).toFixed(2)} °C
                 <span className='humidity'>
                    <img src='' width='56px'></img>
                   
                    
                 </span>
                 <span className='city'>
                {cityData.name}
            </span>
            </p>
            
           
          <span className='hum'>
                        Humidity : {cityData.main.humidity}
                   
                 </span>
                 <div className='hum'>
                    Pressure : {cityData.main.pressure};
                 </div>
                 <div className='hum'>
                    Wind Speed : {cityData.wind.speed}
                 </div>
                 <div className='hum'>
                    Visibility : {cityData.visibility}
                 </div>
                  <div className='hum'>
                    Weather : {cityData.weather[0].description}
                 </div>
        </div>
       
    );
};


