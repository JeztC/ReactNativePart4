import {Pressable, StyleSheet, View} from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#24292e',
        paddingBottom: 15,
        paddingLeft: 15
    },
});

const AppBarTab = ({text}) => {
    return <View style={styles.container}>{text}</View>;
}

export default AppBarTab;