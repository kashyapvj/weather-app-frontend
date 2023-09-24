import { Card } from 'antd';
import { useState, useEffect } from 'react';
import {getWeatherData, checkHealth} from './../api';

const WeatherDetails = ({selectedCountry,
                        selectedCity,
                        fetchData,
                        setFetchData,
                        setWeatherData,
                        weatherData,
    }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWeatherData = async () => {
          setLoading(true);
          getWeatherData(selectedCity)
          .then((response)=>  {
            setWeatherData(response.data)
          }).catch((error) => {
            console.log(error);
          }).finally(()=> {
            setLoading(false);
            setFetchData(false);
          })
       }

        if (fetchData) {
          fetchWeatherData();
        }
  }, [fetchData]);

  useEffect(() => {
    const checkApiHealth = () => {
        checkHealth()
        .then((response)=> {
            console.log("OK");
        }).catch((error) => {
            console.log("error");
        })
    }

    checkApiHealth();

    const intervalId = setInterval(() => {
      checkApiHealth();
    }, 600000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

    return (
        <div>
        { weatherData && (
            <Card hoverable title = {selectedCity} loading={loading} >
                <div>
                    <div className='flex flex-row'>
                        <p className='font-bold'> Temperature: </p>
                        <p className="mx-4"> {weatherData.current.temp_c}&deg;C </p>
                    </div>

                    <div className='flex flex-row'>
                        <p className='font-bold'> Humidity: </p>
                        <p className="mx-4"> {weatherData.current.humidity} </p>
                    </div>
                </div>
            </Card>
        )}
        </div>
    );
};

export default WeatherDetails;