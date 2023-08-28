import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import styles from "../utils/style";

export default function HomeSrc({ navigation }) {
  return (
    <View>
      <View style={styles.BodyH}>
        <Button
          onPress={() => navigation.navigate("Login")}
          mode="contained"
          style={styles.ButtonH}
        >
          Login
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Cadastro")}
          style={styles.ButtonH}
        >
          Cadastro
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Recuperar")}
          style={styles.ButtonH}
        >
          Recuperar senha
        </Button>
      </View>
    </View>
  );
}