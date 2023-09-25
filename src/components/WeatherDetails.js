import { Card, Alert } from 'antd';
import { useState, useEffect } from 'react';
import {getWeatherData, checkHealth} from './../api';

const WeatherDetails = ({selectedCountry,
                        selectedCity,
                        fetchData,
                        setFetchData,
                        setWeatherData,
                        weatherData,
                        setIsError,
                        isError,
                        setIsLoading,
                        isLoading,

    }) => {

    useEffect(() => {
        const fetchWeatherData = async () => {
          setIsLoading(true);
          getWeatherData(selectedCity)
          .then((response)=>  {
            setWeatherData(response.data)
          }).catch((error) => {
            console.log(error);
            setIsError(true);
          }).finally(()=> {
            setIsLoading(false);
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
        { !isError && weatherData && (
            <Card hoverable title = {selectedCity} loading={isLoading} >
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

        {isError && (
            <Alert
                message="Error"
                description="Unable to fetch Data, Please retry later"
                type="error"
                showIcon
            />
        )}
        </div>
    );
};


export default WeatherDetails;