import { useState } from 'react';
import CountryStateDropdown from './CountryStateDropdown'
import WeatherDetails from './WeatherDetails'

const WeatherDashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [selectedCity, setSelectedCity] = useState(undefined);
  const [fetchData, setFetchData] = useState(false);
  const [weatherData, setWeatherData] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div className="w-1/2 mx-auto mt-8">
        <div className="w-1/2 mx-auto">
            <p className="text-3xl font-bold"> Weather App</p>
        </div>

        <div className="mt-10">
            <CountryStateDropdown selectedCountry={selectedCountry}
                                  setSelectedCountry={setSelectedCountry}
                                  selectedCity = {selectedCity}
                                  setSelectedCity = {setSelectedCity}
                                  setFetchData = {setFetchData}
                                  setWeatherData = {setWeatherData}
                                  setIsError = {setIsError}
                                  setIsLoading = {setIsLoading}
                                  isLoading  = {isLoading}
            />
        </div>

        <div className="mt-10">
            <WeatherDetails selectedCountry={selectedCountry}
                            selectedCity = {selectedCity}
                            fetchData = {fetchData}
                            setFetchData = {setFetchData}
                            setWeatherData = {setWeatherData}
                            weatherData = {weatherData}
                            isError = {isError}
                            setIsError = {setIsError}
                            setIsLoading = {setIsLoading}
                            isLoading = {isLoading}
            />
        </div>
    </div>

  );
}

export default WeatherDashboard;