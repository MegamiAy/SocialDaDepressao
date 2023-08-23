import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { View, Text, TouchableOpacity,  } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";

export default function LoginScreen({navigation}){

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')


    useEffect(() => {
        // verifica se o usuário está logado
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Usuário UID: ", user.uid)
                navigation.navigate('VerMaisScreen')
            } else {
                console.log("Usuário não logado")
            }
        })


    }, [])

    function handleLogin() {
        signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('VerMaisScreen')
                console.log(user)
            })
            .catch((error) => {
                console.log(error)
            });
    }


    return (
        <View>
            <Header />
            <View>
                <TextInput
                placeholder="Email..."
                style={styles.inputL}
                value={email}
                onChangeText={setEmail}
                />  
                <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                    <Text>Cadastre-se</Text>
                </TouchableOpacity>
                <TextInput
                placeholder="Senha..."
                style={styles.inputL}
                value={senha}
                onChangeText={setSenha}
                />
                <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                    <Text>Esqueceu a senha?</Text>
                </TouchableOpacity>
                <Button
                onPress={handleLogin}
                mode="contained"
                >Logar</Button>
            </View>    
        </View>
    );
}