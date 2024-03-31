import React, { useState, useEffect } from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/header/Header";
import Chip from "../../components/chip/Chip";
import TabBar from "../../components/tabBar/TabBar";
import DayCard from "../../components/card/dayCard/DayCard";
import fetchWeatherData from "../../../api/fetchWeatherData";
import styles from "../../styles/styles";
import { useRoute } from "@react-navigation/native";
import fetchCityWeatherData from "../../../api/fetchCityWeatherData";

const NextDays = () => {
  const windowWidth = useWindowDimensions().width;
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState([]);
  const route = useRoute();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (route.params && route.params.cityName) {
          console.log("Parâmetros recebidos:", route.params);
          data = await fetchCityWeatherData(route.params.cityName);
        } else {
          console.log("Nenhum parâmetro recebido");
          data = await fetchWeatherData();
        }
        setWeatherData(data);
        setForecast(data.results.forecast.slice(0, 7));
        setLoading(false);
        console.log(data.results);
      } catch (error) {
        console.error("Erro ao obter dados meteorológicos:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [route.params]);

  return (
    <View style={styles.container}>
      {windowWidth >= 768 ? (
        <View style={styles.formContainer}>
          <Header />
        </View>
      ) : (
        <>
          <LinearGradient
            colors={["rgba(0,0,255,0.8)", "rgba(0,0,255,0.3)"]}
            style={styles.background}
          />
          <Header location={weatherData?.results.city_name} />
          {loading ? (
            <Text style={styles.textH1}>Carregando...</Text>
          ) : (
            <>
              <LinearGradient
                colors={["rgba(26, 26, 140, 0.4)", "rgba(26, 26, 140, 0)"]}
                style={{
                  width: "90%",
                  padding: 8,
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "4%",
                }}
              >
                <View
                  style={{
                    width: "90%",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: `https://assets.hgbrasil.com/weather/icons/conditions/${weatherData?.results.condition_slug}.svg`,
                    }}
                    style={{ width: 135, height: 135 }}
                  />
                  <View>
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {weatherData?.results.forecast[0].max}° - máxima
                    </Text>
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {weatherData?.results.forecast[0].min}° - mínima
                    </Text>
                  </View>
                </View>
                <Chip
                  style={{ marginBottom: "4%" }}
                  transparentBackground={true}
                  fullWidth={true}
                  rain={weatherData?.results.rain}
                  humidity={weatherData?.results.humidity}
                  wind_speedy={weatherData?.results.wind_speedy}
                />
              </LinearGradient>
              <View style={{ marginTop: "4%" }}></View>
              {forecast.map((day, index) => (
                <DayCard
                  key={index}
                  weekday={day.weekday}
                  description={day.description}
                  condition_slug={weatherData?.results.condition_slug}
                  min={day.min}
                  max={day.max}
                />
              ))}
              <TabBar />
            </>
          )}
        </>
      )}
    </View>
  );
};

export default NextDays;
