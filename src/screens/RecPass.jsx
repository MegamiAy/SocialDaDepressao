import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { passwordReset } from "../config/firebase";
import { useState } from "react";
import styles from "../utils/style";

export default function RecPass({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handlePasswordReset() {
    try {
      await passwordReset(email);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        console.log("Usuário não encontrado");
        setEmail("");
      }
    }
  }

  return (
    <View>
      <View style={styles.BodyH}>
      <TextInput
        label="E-mail"
        placeholder="Digite seu e-mail..."
        multiline={false}
        value={email}
        onChangeText={setEmail}
        style={styles.InputL}
      /> 
      <Button
        mode="contained"
        onPress={handlePasswordReset}
        style={styles.ButtonC}
      >
        Recuperar Senha
      </Button>
      </View>
    </View>
  );
}