import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

const CityCard = ({ city_name, description, condition_slug, temp }) => {
  const imageUrl = `https://assets.hgbrasil.com/weather/icons/conditions/${condition_slug}.svg`;
  const navigation = useNavigation();
  const route = useRoute();

  const handleCityCard = (cityName) => {
    if (route.name === "Weather") {
      navigation.navigate("NextDays");
    } else {
      navigation.navigate("Weather", { cityName });
    }
  };

  const limitedCityName = route.name === "Weather" ? city_name.substring(0, 8) + "..." : city_name;
  const limitedDescription = route.name === "Weather" ? description.substring(0, 8) + "..." : description;

  return (
    <TouchableOpacity onPress={() => handleCityCard(city_name)} style={{ width: route.name === "Search" ? "90%" : "", marginBottom: "2%" }}>
      <LinearGradient
        colors={["rgba(26, 26, 140, 0.4)", "rgba(26, 26, 140, 0)"]}
        start={[0, 0]}
        end={[1, 1]}
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 10,
          borderRadius: 8,
          marginRight: 10,
          height: 60,
          marginBottom: 10,
          gap: 8
        }}
      >
        <Image
          source={{
            uri: imageUrl,
          }}
          style={{ width: 30, height: 30 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "white", textAlign: route.name === "Search" ? "center" : "" }}>
            {limitedCityName}
          </Text>
          <Text style={{ fontSize: 12, color: "white", textAlign: route.name === "Search" ? "center" : "" }}>{limitedDescription}</Text>
        </View>
        <Text style={{ fontSize: 18, color: "white" }}>{temp}°</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CityCard;
