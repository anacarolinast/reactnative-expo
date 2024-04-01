import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import styles from "../../styles/styles";
import Header from "../../components/header/Header";
import { LinearGradient } from "expo-linear-gradient";
import TabBar from "../../components/tabBar/TabBar";
import { SearchBar } from "@rneui/themed";
import { HiOutlineLocationMarker } from "react-icons/hi";
import CityCard from "../../components/card/cityCard/CityCard";
import fetchCitiesWeatherData from "../../../api/fetchCitiesWeatherData";
import fetchCityWeatherData from "../../../api/fetchCityWeatherData";

const Search = () => {
  const windowWidth = useWindowDimensions().width;
  const [value, setValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500);
    setSearchTimeout(timeoutId);
    return () => clearTimeout(timeoutId);
  }, [value]);

  const fetchData = async () => {
    setWeatherData(null);
    if (value === "") {
      setLoading(false);
      return;
    }
    setLoading(true);
    console.log("Iniciando busca...");
    try {
      const fetchedWeatherData = await fetchCityWeatherData(value);
      setLoading(false);
      if (fetchedWeatherData) {
        setWeatherData(fetchedWeatherData);
      } else {
        console.log("Nenhum dado encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados meteorológicos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchCitiesWeatherData();
        setWeatherData(weatherData);
        setLoading(false);
        let allResults = [];
        weatherData.forEach((cityData) => {
          if (cityData.results) {
            allResults.push(cityData.results);
          }
        });
        setResults(allResults);
      } catch (error) {
        console.error("Erro ao obter dados meteorológicos:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
          <Header />
          <View style={styles.info}>
            <SearchBar
              platform="android"
              containerStyle={{ backgroundColor: "transparent", width: "90%" }}
              inputContainerStyle={{ color: "white" }}
              inputStyle={{
                color: "white",
                borderBottomWidth: 1,
                borderBottomColor: "white",
              }}
              leftIconContainerStyle={{ color: "white" }}
              cancelIcon={{ color: "white" }}
              clearIcon={{ color: "white" }}
              searchIcon={{ color: "white" }}
              loadingProps={{}}
              onChangeText={setValue}
              placeholder="Procurar..."
              placeholderTextColor="#888"
              cancelButtonTitle="Cancel"
              cancelButtonProps={{}}
              onCancel={() => setValue("")}
              value={value}
            />
            <HiOutlineLocationMarker style={{ color: "white" }} size={24} />
          </View>
          {weatherData && weatherData.results ? (
            <CityCard
            city_name={weatherData.results.city_name}
            description={weatherData.results.description}
            condition_slug={weatherData.results.condition_slug}
            temp={weatherData.results.temp}
          />
          ) : (
            results.map((city, index) => (
              <CityCard
                key={index}
                city_name={city.city_name}
                description={city.description}
                condition_slug={city.condition_slug}
                temp={city.temp}
              />
            ))
          )}
          <TabBar />
        </>
      )}
    </View>
  );
};

export default Search;
