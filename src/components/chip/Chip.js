import React from "react";
import { View, Text } from "react-native";
import { BsUmbrella, BsDropletHalf, BsWind } from "react-icons/bs";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../styles/styles";

const Chip = ({ transparentBackground, fullWidth, rain, humidity, wind_speedy }) => {
  const widthStyle = fullWidth ? { width: "100%" } : { width: "90%" };

  return (
    <LinearGradient
      colors={transparentBackground ? ["rgba(26, 26, 140, 0)", "rgba(26, 26, 140, 0)"] : ["rgba(26, 26, 140, 0.4)", "rgba(26, 26, 140, 0)"]}
      style={{
        ...widthStyle,
        padding: 10,
        borderRadius: 8,
        display: "flex",
        justifyContent: "center",
        backgroundColor: transparentBackground ? "transparent" : "transparent",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <BsUmbrella style={{ color: "white" }} size={24} />
          <Text style={styles.textH2}>{rain}mm</Text>
          <Text style={styles.textH3}>Precipitação</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <BsDropletHalf style={{ color: "white" }} size={24} />
          <Text style={styles.textH2}>{humidity}%</Text>
          <Text style={styles.textH3}>Umidade</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <BsWind style={{ color: "white" }} size={24} />
          <Text style={styles.textH2}>{wind_speedy}</Text>
          <Text style={styles.textH3}>Velocidade</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Chip;
