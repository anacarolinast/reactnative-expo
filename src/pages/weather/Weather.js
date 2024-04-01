import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  useWindowDimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../../styles/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/header/Header";
import { LinearGradient } from "expo-linear-gradient";
import Chip from "../../components/chip/Chip";
import TodayCard from "../../components/card/todayCard/TodayCard";
import CityCard from "../../components/card/cityCard/CityCard";
import { HiOutlinePlusSm } from "react-icons/hi";
import fetchCitiesWeatherData from "../../../api/fetchCitiesWeatherData";
import fetchCityWeatherData from "../../../api/fetchCityWeatherData";
import TabBar from "../../components/tabBar/TabBar";
import fetchWeatherData from "../../../api/fetchWeatherData";

const Weather = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const windowWidth = useWindowDimensions().width;
  const [weatherData, setWeatherData] = useState(null);
  const [cityWeatherData, setCityWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cityResults, setCityResults] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchCitiesData = async () => {
      try {
        const citiesWeatherData = await fetchCitiesWeatherData();
        setWeatherData(citiesWeatherData);
        setLoading(false);
        let allResults = [];
        citiesWeatherData.forEach((cityData) => {
          if (cityData.results) {
            allResults.push(cityData.results);
          }
        });
        setCityResults(allResults);
      } catch (error) {
        console.error("Erro ao obter dados meteorológicos das cidades:", error);
        setLoading(false);
      }
    };
    fetchCitiesData();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let data;
        if (route.params && route.params.cityName) {
          console.log("Parâmetros recebidos:", route.params);
          data = await fetchCityWeatherData(route.params.cityName);
        } else {
          console.log("Nenhum parâmetro recebido");
          data = await fetchWeatherData();
        }
        setCityWeatherData(data);
        setForecast(data.results.forecast.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Erro ao obter dados meteorológicos:", error);
        setLoading(false);
      }
    };
    fetchWeather();
  }, [route.params]);

  const getBackgroundColors = (time) => {
    const hour = parseInt(time.split(":")[0]);
    if (hour >= 6 && hour < 12) {
      return ["#FFE155", "#FFD242"];
    } else if (hour >= 12 && hour < 18) {
      return ["#55B3FF", "#42A1FF"];
    } else {
      return ["#202C7C", "#0D1440"];
    }
  };

  const handleNavigateToNextDays = (cityName) => {
    navigation.navigate("NextDays", { cityName });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header location={cityWeatherData?.results.city_name} />
        <Text style={styles.textH1}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {windowWidth >= 768 ? (
        <View style={styles.formContainer}>
          <Header location={cityWeatherData?.results.city_name} />
          <Text style={styles.textH1}>
            {cityWeatherData?.results.description}
          </Text>
          <Image
            source={{
              uri: "https://assets.hgbrasil.com/weather/icons/conditions/clear_day.svg",
            }}
            style={{ width: 100, height: 100, marginTop: "3%" }}
          />
          <Text style={{ color: "white", fontSize: 40, fontWeight: "bold" }}>
            31°
          </Text>
          <Text style={styles.textH2}>
            {cityWeatherData?.results.date} | {cityWeatherData.results.time}
          </Text>
          <Chip />
          <View
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text style={styles.textH2}>Hoje</Text>
            <Text style={styles.textH2}>Próximos 7 dias</Text>
          </View>
        </View>
      ) : (
        <>
          <LinearGradient
            colors={getBackgroundColors(cityWeatherData?.results.time)}
            style={styles.background}
          />
          <Header location={cityWeatherData?.results.city} />
          <Text style={styles.textH1}>
            {cityWeatherData?.results.description}
          </Text>
          <Image
            source={{
              uri: "https://assets.hgbrasil.com/weather/icons/conditions/cloudly_day.svg",
            }}
            style={{ width: 135, height: 135, marginTop: "3%" }}
          />
          <Text style={{ color: "white", fontSize: 40, fontWeight: "bold" }}>
            {cityWeatherData?.results.temp}°
          </Text>
          <Text style={{ ...styles.textH2, marginBottom: "4%" }}>
            {cityWeatherData?.results.date} | {cityWeatherData?.results.time}
          </Text>
          <Chip
            transparentBackground={false}
            fullWidth={false}
            rain={cityWeatherData?.results.rain}
            humidity={cityWeatherData?.results.humidity}
            wind_speedy={cityWeatherData?.results.wind_speedy}
          />
          <View style={styles.info}>
            <Text style={styles.textH2}>Hoje</Text>
            <TouchableOpacity
              onPress={() =>
                handleNavigateToNextDays(cityWeatherData?.results.city_name)
              }
            >
              <Text style={styles.textH2}>Próximos 7 dias</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {forecast.map((day, index) => (
              <TodayCard
                key={index}
                weekday={day.weekday}
                condition_slug={cityWeatherData?.results?.condition_slug}
              />
            ))}
          </View>
          <View style={styles.info}>
            <Text style={styles.textH2}>Outras cidades</Text>
            <HiOutlinePlusSm style={{ color: "white" }} size={24} />
          </View>
          <ScrollView
            horizontal={true}
            style={{ flexDirection: "row", width: "90%" }}
            showsHorizontalScrollIndicator={false}
          >
            {cityResults.map((city, index) => (
              <CityCard
                key={index}
                city_name={city.city_name}
                description={city.description}
                condition_slug={city.condition_slug}
                temp={city.temp}
              />
            ))}
          </ScrollView>
          <TabBar />
        </>
      )}
    </View>
  );
};

export default Weather;
