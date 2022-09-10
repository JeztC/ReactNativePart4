import {Image, StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    container: {
        flexGrow: 0,
        paddingRight: 15,
    },
    tinyLogo: {
        width: 66,
        height: 58,
        paddingRight: 40
    },
})

const ImageComponent = ({imageUrl}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.tinyLogo} source={{
                uri: imageUrl,
            }} />
        </View>
    )
}

export default ImageComponent