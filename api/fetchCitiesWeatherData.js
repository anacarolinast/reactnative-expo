import axios from "axios";

const fetchCitiesWeatherData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/weather/cities');
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados meteorológicos das cidades aleatórias:', error);
        return null;
    }
};

export default fetchCitiesWeatherData;