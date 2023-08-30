import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db, storage, storage } from '../config/firebase';

// Função para inicializar o Firebase
function initializeFirebase() {
    // Coloque aqui o código de inicialização do Firebase
}

function ImageUploadComponent() {
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária para acessar a biblioteca de mídia.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setSelectedImage(result.uri);
        }
    };

    const uploadImage = async () => {
        if (!selectedImage) {
            Alert.alert('Nenhuma imagem selecionada.');
            return;
        }


        const imageRef = ref(storage, 'images/' + selectedImage.split('/').pop());
        const response = await fetch(selectedImage);
        const blob = await response.blob();

        try {
            await uploadBytes(imageRef, blob);

            const firestore = db;
            const imagesCollection = collection(firestore, 'images');

            await addDoc(imagesCollection, {
                imageUrl: await getDownloadURL(imageRef),
                timestamp: new Date(),
            });

            Alert.alert('Upload concluído com sucesso.');
            setSelectedImage(null);
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
        }
    };

    return (
        <View>
            <Button title="Selecionar imagem" onPress={pickImage} />
            {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
            <Button title="Upload da imagem" onPress={uploadImage} />
        </View>
    );
}

export default function App() {
    initializeFirebase();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ImageUploadComponent />
        </View>
    );
}