// import react from 'react';
import { useState,useEffect } from "react";
import './weather.css';

const Weather=()=>{
    const [cities, setCities]=useState([]);
     const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 100; 
     const threshold = 200; 

      useEffect(() => {
        getCitiesData();
    }, []);
    const getCitiesData=async()=>{
        // const limit = 100; // Number of records per page
        // const offset = (page - 1) * limit; // Calculate the offset based on the current page
         const offset = (page - 1) * limit;
        const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&offset=${offset}&refine=cou_name_en%3A%22India%22&refine=cou_name_en%3A%22Japan%22&refine=cou_name_en%3A%22Taiwan%2C%20China%22&refine=cou_name_en%3A%22Switzerland%22&refine=cou_name_en%3A%22Singapore%22&refine=cou_name_en%3A%22Swaziland%22&refine=cou_name_en%3A%22Korea%2C%20Dem.%20People%27s%20Rep.%20of%22&refine=cou_name_en%3A%22Afghanistan%22&refine=cou_name_en%3A%22Australia%22&refine=cou_name_en%3A%22Brazil%22&refine=cou_name_en%3A%22China%22&refine=cou_name_en%3A%22Canada%22&refine=cou_name_en%3A%22Finland%22&refine=cou_name_en%3A%22France%22&refine=cou_name_en%3A%22Hong%20Kong%2C%20China%22&refine=cou_name_en%3A%22Iceland%22&refine=cou_name_en%3A%22Korea%2C%20Republic%20of%22&refine=cou_name_en%3A%22Mauritius%22&refine=cou_name_en%3A%22Nepal%22&refine=cou_name_en%3A%22New%20Zealand%22&refine=cou_name_en%3A%22Pakistan%22&refine=cou_name_en%3A%22Qatar%22&refine=cou_name_en%3A%22Saudi%20Arabia%22&refine=cou_name_en%3A%22Sri%20Lanka%22&refine=cou_name_en%3A%22Sweden%22`;
        const options={
            method:'GET',
        };
        setLoading(true);
        try {
            const responser=await fetch(url,options);
            const result=await responser.json();
            //  const citiesData = result.results.map(record => record);
            //  console.log(citiesData.name);
            // setCities(citiesData);
            // console.log(result.timezone)
            // console.log('API Response:', result);
            const parsedData = result.results.map(record => ({
        name: record.name,
        country: record.label_en,
        population: record.population,
        country_code: record.country_code,
        timezone: record.timezone
      }));
      console.log('Parsed Data:', parsedData);
       setCities(prevCities => [...prevCities, ...parsedData]);
        setPage(prevPage => prevPage + 1);
            // result.results.forEach(function(city) {
            //     console.log(city.name);
            //     console.log(city.label_en);
            //     console.log(city.population);
            //     console.log(city.country_code);
            //     console.log(city.timezone);
            // });

            
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }
    const handleScroll = () => {
        const scrolled = window.innerHeight + document.documentElement.scrollTop;
        const totalHeight = document.documentElement.offsetHeight;
        if (!loading && scrolled + threshold >= totalHeight) {
            getCitiesData();
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);
  



    return(
        
        <>
        <h1>Weather Forecast for different Cities accross the globe</h1>
        <center>
        <div className="container">
    <table className="animated-table" id="city-table">
      <thead>
        <tr>
          <th>City</th>
          <th>Country</th>
          <th>Country Code</th>
          <th>Population</th>
          <th>TimeZone</th>
        </tr>
      </thead>
      <tbody>
                {cities.map(city => {
            {/* console.log('City:', city); */}
            return (
                <tr key={city.name}>
                    <td>{city.name}</td>
                    <td>{city.country}</td>
                    <td>{city.country_code}</td>
                    <td>{city.population}</td>
                    <td>{city.timezone}</td>
                </tr>
            );
        })}
        
      </tbody>
    </table>
  </div>
       </center>
        </>
       
    )
}

export default Weather;