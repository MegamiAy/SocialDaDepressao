import { ScrollView, View } from "react-native";
import Post from "../components/Post";
import { Button } from "react-native-paper";
import styles from "../utils/style";

export default function FeedSrc({ navigation }) {
  return (
    <ScrollView >
      <View style={styles.BodyH}>
        <Button
          mode="contained"
          buttonColor="gray"
          textColor="#fff"
          onPress={() => {
            navigation.navigate("Post");
          }}
          style={styles.ButtonL}
        >Clique aqui para ver seus Posts</Button>
      </View>
    </ScrollView>
  );
}