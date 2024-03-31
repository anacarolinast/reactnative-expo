const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/weather', async (req, res) => {
   try {
       const response = await axios.get(`https://api.hgbrasil.com/weather?key=144bde8c&lat=-8.11208&lon=-35.0154&user_ip=remote`);
       res.json(response.data);
   } catch (error) {
       res.status(500).json({ error: 'Erro ao obter dados meteorológicos.' });
   }
});

app.listen(PORT, () => {
   console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/weather/cities', async (req, res) => {
    try {
        console.log('Iniciando requisição para obter dados meteorológicos das cidades.');

        const cities = ['Rio de Janeiro', 'New York', 'London', 'Tokyo', 'Paris', 'Mumbai', 'Pequim', 'Chicago', 'San Francisco', 'Los Angeles', 'Brasília'];
        const randomCities = cities.sort(() => Math.random() - 0.7).slice(0, 7);
        console.log('Cidades aleatórias selecionadas:', randomCities);

        const weatherDataPromises = randomCities.map(city => {
            console.log(`Enviando requisição para a cidade: ${city}`);
            return axios.get(`https://api.hgbrasil.com/weather?key=144bde8c&city_name=${city}`);
        });

        const responses = await Promise.all(weatherDataPromises);
        console.log('Respostas recebidas:', responses);

        const weatherData = responses.map(response => response.data);
        console.log('Dados meteorológicos obtidos:', weatherData);

        res.json(weatherData);
    } catch (error) {
        console.error('Erro ao obter dados meteorológicos:', error);
        res.status(500).json({ error: 'Erro ao obter dados meteorológicos.' });
    }

    app.get('/weather/city', async (req, res) => {
        try {
            const { cityName } = req.query;
            if (!cityName) {
                return res.status(400).json({ error: 'Nome da cidade não especificado na consulta.' });
            }
    
            const response = await axios.get(`https://api.hgbrasil.com/weather?key=144bde8c&city_name=${cityName}`);
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter dados meteorológicos.' });
        }
    });
    
 });
