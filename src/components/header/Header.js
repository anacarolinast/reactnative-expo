// Header.js

import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/styles";
import {
  HiOutlineArrowSmLeft,
  HiOutlineLocationMarker,
  HiOutlineBell,
} from "react-icons/hi";
import { BsArrowClockwise } from "react-icons/bs";
import { useNavigation, useRoute } from "@react-navigation/native";

const Header = ({ location }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);

  const handleNavigateToWeather = () => {
    navigation.navigate("Weather");
  };

  const handleNavigateToNextDays = () => {
    navigation.navigate("NextDays");
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleNavigateToWeather}>
        {route.name === "Weather" ? (
          <BsArrowClockwise
            style={{ color: "white", opacity: refreshing ? 0.5 : 1 }}
            size={24}
            onPress={handleRefresh}
          />
        ) : (
          <HiOutlineArrowSmLeft style={{ color: "white" }} size={24} />
        )}
      </TouchableOpacity>
      <View style={styles.location}>
        {route.name !== "Search" && (
          <View>
            <HiOutlineLocationMarker style={{ color: "white" }} size={24} />
          </View>
        )}
        <TouchableOpacity onPress={handleNavigateToNextDays}>
          <Text style={styles.textH2}>
            {route.name === "Search" ? "Pesquisar cidade" : location}
          </Text>
        </TouchableOpacity>
      </View>
      <HiOutlineBell style={{ color: "white" }} size={24} />
    </View>
  );
};

export default Header;
