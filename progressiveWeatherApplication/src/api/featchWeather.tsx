import axios from "axios";

export const fetchWeather = async (city: string) => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`);
    return data;
}
