import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { FaHome, FaUser, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useNavigation } from "@react-navigation/native";

const TabBar = () => {
  const navigation = useNavigation();
  const handleNavigateToSearch = () => {
    navigation.navigate("Search");
  };
  const handleNavigateToWeather = () => {
    navigation.navigate("Weather");
  };
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "transparent",
          height: 50,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            color: "white",
            opacity: "0.8",
            marginHorizontal: 10,
          }}
          onPress={handleNavigateToWeather}
        >
          <FaHome size={16} />
          <Text style={{ marginTop: 5, color: "white", opacity: "0.8" }}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            color: "white",
            opacity: "0.8",
            marginHorizontal: 10,
          }}
        >
          <FaUser size={16} />
          <Text style={{ marginTop: 5, color: "white", opacity: "0.8" }}>
            Perfil
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            color: "white",
            opacity: "0.8",
            marginHorizontal: 10,
          }}
          onPress={handleNavigateToSearch}
        >
          <FaSearch size={16} />
          <Text style={{ marginTop: 5, color: "white", opacity: "0.8" }}>
            Pesquisar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            color: "white",
            opacity: "0.8",
            marginHorizontal: 10,
          }}
        >
          <FaSignOutAlt size={16} />
          <Text style={{ marginTop: 5, color: "white", opacity: "0.8" }}>
            Sair
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TabBar;
