import axios from 'axios';
const WEATHER_URI='/weather';
const HEALTH_CHECK_URI='/weather/health';

const fetchData = (uri) => {
    const url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}${uri}`;
    console.log(url);
    return axios.get(url);
}

export const getWeatherData = (param) => {
    return fetchData(`${WEATHER_URI}/${param.toLowerCase()}`);
}

export const checkHealth = () => {
    return fetchData(HEALTH_CHECK_URI);
}