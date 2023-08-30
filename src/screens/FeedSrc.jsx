import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import firebaseApp from './firebaseApp'; // Import and configure your Firebase app here

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const db = firebaseApp.firestore();
      const postsCollection = collection(db, 'posts');
      const snapshot = await getDocs(postsCollection);

      const fetchedPosts = [];

      for (const doc of snapshot.docs) {
        const postData = doc.data();
        const imageUrl = await getImageUrl(postData.imagePath);
        fetchedPosts.push({
          id: doc.id,
          name: postData.name,
          description: postData.description,
          imageUrl,
        });
      }

      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  const getImageUrl = async (imagePath) => {
    const storage = getStorage(firebaseApp);
    const imageRef = ref(storage, imagePath);

    try {
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    } catch (error) {
      console.error('Error getting image URL:', error);
      return null;
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postName}>{item.name}</Text>
      <Text style={styles.postDescription}>{item.description}</Text>
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  postContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  postName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});

export default FeedSrc;
