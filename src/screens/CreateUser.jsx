import { View, Text, TouchableOpacity, } from "react-native";
import React from "react";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";

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
                const docRef = addDoc(collection(db, "Pessoa"), {
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
            <Header />
            <View>
                <TextInput
                    placeholder="Nome da Instituição ..."
                    value={nome}
                    onChangeText={setNome}
                    label="nome" />
                <TextInput
                    placeholder="Email da Instituição ..."
                    value={email}
                    onChangeText={setEmail}
                    label="email" />
                <TextInput
                    placeholder="Senha ..."
                    value={senha}
                    onChangeText={setSenha}
                    label="senha" />
                <TouchableOpacity onPress={() => navigation.navigate("LoginUser")}>
                    <Text>Já está cadastrado? <Text>Entrar</Text> </Text>
                </TouchableOpacity>
                <Button
                    mode="contained"
                    onPress={cadastrar}
                >Cadastrar</Button>
            </View>

        </View>
    );
}