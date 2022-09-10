import {StyleSheet, View} from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flexWrap: "wrap",
        alignItems: 'flex-start',
        alignContent: 'center'
    },
    languageItem: {
        color: 'white',
        backgroundColor: '#0366d6',
        padding: 5,
        flexGrow: 1,
    },
})

const DescriptionComponent = ({fullName, description, language}) => {
    return (
        <View style={styles.container}>
            <Text fontWeight="bold" fontSize="subheading">{fullName}</Text>
            <Text>{description}</Text>
            <Text style={styles.languageItem} >{language}</Text>
        </View>
    )
}

export default DescriptionComponent