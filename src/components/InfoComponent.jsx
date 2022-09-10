import {StyleSheet, View} from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-around",
        alignItems: 'flex-end',
        alignContent: 'center',
        flexGrow: 1,
    },
})

const InfoComponent = ({stars, forks, reviews, rating}) => {
    return (
        <View>
            <View style={styles.container}>
                <Text fontWeight="bold" fontSize="subheading">{numFormatter(stars)}</Text>
                <Text fontWeight="bold" fontSize="subheading">{numFormatter(forks)}</Text>
                <Text fontWeight="bold" fontSize="subheading">{numFormatter(reviews)}</Text>
                <Text fontWeight="bold" fontSize="subheading">{numFormatter(rating)}</Text>
            </View>
            <View style={styles.container}>
                <Text>    Stars</Text>
                <Text>          Forks</Text>
                <Text>Reviews</Text>
                <Text>Rating</Text>
            </View>
        </View>
    )
}

function numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
}

export default InfoComponent