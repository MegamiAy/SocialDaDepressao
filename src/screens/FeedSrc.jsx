import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import styles from "../utils/style";

export default function FeedSrc({ navigation }) {

    const [msg, setMsg] = useState("");

    return (
        <View>
            <View style={styles.BodyH}>
                {/* <Fieldset> */}

                    {/* nome do usuário */}
                    {/* foto da postagem*/}
                    {/* mensagem da postagem */}

                {/* </Fieldset> */}
            </View>
        </View>
    );
}