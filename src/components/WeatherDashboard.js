import { useState } from 'react';
import CountryStateDropdown from './CountryStateDropdown'
import WeatherDetails from './WeatherDetails'

const WeatherDashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [selectedCity, setSelectedCity] = useState(undefined);
  const [fetchData, setFetchData] = useState(false);
  const [weatherData, setWeatherData] = useState(undefined);

  return (
    <div className="w-1/2 mx-auto mt-8">
        <CountryStateDropdown selectedCountry={selectedCountry}
                              setSelectedCountry={setSelectedCountry}
                              selectedCity = {selectedCity}
                              setSelectedCity = {setSelectedCity}
                              setFetchData = {setFetchData}
                              setWeatherData = {setWeatherData}
        />

        <div className="mt-10">
            <WeatherDetails selectedCountry={selectedCountry}
                            selectedCity = {selectedCity}
                            fetchData = {fetchData}
                            setFetchData = {setFetchData}
                            setWeatherData = {setWeatherData}
                            weatherData = {weatherData}
            />
        </div>
    </div>

  );
}

export default WeatherDashboard;