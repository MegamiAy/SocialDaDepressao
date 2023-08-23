import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function HomeSrc({ navigation }) {
  return (
    <View>
      <Header />
      <View >
        <Button
          onPress={() => navigation.navigate("Login")}
          mode="contained"
        >
          Login
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Registrar")}
          color="#000"
        >
          Cadastrar
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Recuperar")}
          color="#000"
        >
          Recuperar senha
        </Button>
      </View>
    </View>
  );
}