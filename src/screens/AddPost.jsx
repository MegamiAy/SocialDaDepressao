import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import {TextInput } from "react-native-paper";
import styles from "../utils/style";
import { collection } from "firebase/firestore";
import { db } from "../config/firebase";

export default function AddPost({ navigation }) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    async function inserirPost() {
        try {
            if (image) {
                const response = await fetch(image);
                const blob = await response.blob();
                const base64Image = await convertBlobToBase64(blob);

                const payload = {
                    Title: title,
                    Content: content,
                    Image: base64Image,
                };
                const post = await addDoc(postRef, payload);
                console.log(post);
            } else {
                const payload = {
                    Title: title,
                    Content: content,
                };
                const post = await addDoc(postRef, payload);
                console.log(post);
            }
        } catch (error) {
            console.log(error);
            console.error("Error uploading image: ", error);
        }
    }

    const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const postRef = collection(db, "Post");

    const ImageComponent = () => {
        if (Platform.OS === "web") {
            return <img src={image} />;
        } else {
            return (
                <Image source={{ uri: image }} />
            );
        }
    };

    return (
        <View>
            <View style={styles.BodyH}>
                <Text style={styles.Int}>Publique suas fotos:</Text>
                <TextInput 
                label="Titulo" 
                value={title} 
                onChangeText={setTitle} 
                style={styles.InputL}
                />
                <TextInput
                    label="Descrição"
                    value={content}
                    onChangeText={setContent}
                    style={styles.InputL}
                />
                {image && <ImageComponent />}

                <Button title="Escolha a Imagem"
                onPress={pickImage} 
                // style={styles.ButtonC}
                />
                <Button
                    mode="contained"
                    onPress={inserirPost}
                    // style={styles.ButtonC}
                    disabled={!title || !content}
                    title="Postar"
                />
            </View>
        </View>
    );
}