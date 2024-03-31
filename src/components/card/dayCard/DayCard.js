import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../../../styles/styles";

const DayCard = ({ weekday, description, condition_slug, min, max }) => {
  const imageUrl = `https://assets.hgbrasil.com/weather/icons/conditions/${condition_slug}.svg`;
  return (
    <View
      style={{
        backgroundColor: "transparent",
        width: "90%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        flexDirection: "row",
      }}
    >
      <Text style={[styles.textH1, { width: "30%" }]}>{weekday}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "30%",
          gap: "10%",
        }}
      >
        <Image
          source={{
            uri: imageUrl,
          }}
          style={{ width: 30, height: 30 }}
        />
        <Text style={styles.textH2}>{description}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "30%",
          gap: "4%",
        }}
      >
        <Text style={styles.textH1}>{max}°</Text>
        <Text style={styles.textH1}>{min}°</Text>
      </View>
    </View>
  );
};

export default DayCard;
