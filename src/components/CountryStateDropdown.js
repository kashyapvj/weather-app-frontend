import { useState, useEffect} from 'react';
import { Select, Button } from 'antd';
import { Country, City }  from 'country-state-city';

const CountryStateDropdown = ({ selectedCountry,
                                selectedCity,
                                setSelectedCountry,
                                setSelectedCity,
                                setFetchData,
                                setWeatherData,
                                setIsError,
                                setIsLoading,
                                isLoading,
  }) => {

  const [isSubmit, setIsSubmit] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    setAllCountries(Country.getAllCountries())
  }, []);

  const handleCountryChange = (value, option) => {
    setSelectedCountry(option.data.name);
    setCityOptions(City.getCitiesOfCountry(option.data.isoCode));
    setSelectedCity(undefined);
    setIsSubmit(false);
    setIsError(false);
    setFetchData(false);
    setWeatherData(undefined);
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setWeatherData(undefined);
    setFetchData(false);
    setIsError(false);
    setIsSubmit(true);
  };

  const handleSubmit = (value) => {
    setFetchData(true)
    setIsError(false);
    setIsLoading(true);
    setWeatherData(undefined);
  };

  const filterCountryOption = (input, option) => {
    return option.data.name.toLowerCase().includes(input.toLowerCase());
  }

  const filterCityOption = (input, option) => {
    return option.data.name.toLowerCase().includes(input.toLowerCase());
  }

  function getCountryFlagEmoji(countryCode) {
      const country = Country.getCountryByCode(countryCode);
      if (country) {
        return country.flag;
      }
      return '';
}

  const SelectCountry = () => {
    return (
        <div className=' flex items-center w-full md:w-1/2'>
            <p> Country: </p>
              <Select
                optionFilterProp="children"
                showSearch
                className='ml-2 w-full'
                onChange={handleCountryChange}
                value={selectedCountry}
                placeholder = 'Select Country'
                filterOption={filterCountryOption}
              >
              {allCountries.map((country) => (
                <Select.Option key={country.isoCode} value={country.isoCode} label={country.name} data={country}>
                  <div className="flex">
                      <p> {getCountryFlagEmoji(country.isoCode)} </p>
                      <p className="ml-4"> {country.name}  </p>
                  </div>
                </Select.Option>
              ))}
              </Select>
        </div>
    );
  };

  const SelectCity = () => {
    return (
        <div className='mx-4 w-full mt-6 md:w-1/2 md:mt-0' >
            { selectedCountry &&
             (
             <div className="flex items-center">
                <p> City: </p>
               <Select
                  showSearch
                  className='ml-2 w-full'
                  placeholder="Select City"
                  onChange={handleCityChange}
                  value={selectedCity}
                  filterOption = {filterCityOption}
               >
                    {cityOptions.map((city) => (
                        <Select.Option key={city.name} value={city.name} data={city} label={city.name}>
                            <div className="flex">
                                <p> {city.name} </p>
                            </div>
                        </Select.Option>
                    ))}
               </Select>
               </div>
            )}
        </div>
    )
  };

  return (
    <div>
      <div>
        <div className = 'md:flex'>
           <SelectCountry/>
            <SelectCity/>
       </div>

       <div className='mt-6'>
            <Button type='primary' onClick={handleSubmit} disabled= {!isSubmit} loading={isLoading}>Submit </Button>
       </div>

      </div>
    </div>
  );
};

export default CountryStateDropdown;
