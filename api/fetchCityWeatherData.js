import axios from "axios";

const fetchCityWeatherData = async (cityName) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/weather/city?cityName=${encodeURIComponent(
        cityName
      )}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados meteorológicos da cidade:", error);
    throw error; 
  }
};

export default fetchCityWeatherData;
