import axios from 'axios';

const fetchWeatherData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/weather');
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados meteorológicos:', error);
        return null;
    }
};

export default fetchWeatherData;