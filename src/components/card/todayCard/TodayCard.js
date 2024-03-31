import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";

const TodayCard = ({ weekday, condition_slug }) => {
  const imageUrl = `https://assets.hgbrasil.com/weather/icons/conditions/${condition_slug}.svg`;
  const route = useRoute();
  return (
    <LinearGradient
      colors={["rgba(26, 26, 140, 0.4)", "rgba(26, 26, 140, 0)"]}
      start={[0, 0]}
      end={[1, 1]}
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        margin: 5,
        width: "15%",
        borderRadius: "8px"
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: "500", color: "white", marginBottom: 5 }}>{weekday}</Text>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={{ width: 30, height: 30 }}
      />
    </LinearGradient>
  );
};

export default TodayCard;
