import { View, Text, TouchableOpacity, } from "react-native";
import React from "react";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import styles from "../utils/style";
import { addDoc, collection } from "firebase/firestore";

export default function CreateScreen({ navigation }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function cadastrar() {
        console.log(nome);
        console.log(email);
        console.log(senha);

        createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                const docRef = addDoc(collection(db, "user"), {
                    nome: nome,
                    email: email,
                    senha: senha,
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    return (
        <View>
            <View style={styles.BodyH}>
                <TextInput
                    placeholder="Seu Nome..."
                    value={nome}
                    onChangeText={setNome}
                    label="nome" 
                    style={styles.InputL}/>
                <TextInput
                    placeholder="Seu Email..."
                    value={email}
                    onChangeText={setEmail}
                    label="email"
                    style={styles.InputL}/>
                <TextInput
                    placeholder="Sua Senha..."
                    value={senha}
                    onChangeText={setSenha}
                    label="senha" 
                    style={styles.InputL}/>
                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.Touch}>
                    <Text>Já está cadastrado? <Text>Entrar</Text> </Text>
                </TouchableOpacity >
                <Button
                    mode="contained"
                    onPress={cadastrar}
                    style={styles.ButtonC}
                >Cadastrar</Button>
            </View>

        </View>
    );
}