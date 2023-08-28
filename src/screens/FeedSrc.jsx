import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import styles from "../utils/style";

export default function FeedSrc({ navigation }) {

    const [msg, setMsg] = useState("");

    return (
        <View>
            <View style={styles.BodyH}>
                <Text style={styles.Int}>Publique suas fotos:</Text>
                <TextInput
                    label="Sua Mensagem"
                    placeholder="Digite sua mensagem"
                    multiline={false}
                    value={msg}
                    onChangeText={setMsg}
                    style={styles.InputL}
                />
                
            </View>
        </View>
    );
}