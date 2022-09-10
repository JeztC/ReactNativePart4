import ImageComponent from "./ImageComponent";
import {View, StyleSheet, Pressable, Linking} from "react-native";
import DescriptionComponent from "./DescriptionComponent";
import InfoComponent from "./InfoComponent";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    backGroundContainer: {
        backgroundColor: 'white',
    },
    container: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        flexGrow: 1,
    },
    openGithub: {
        color: 'white',
        fontWeight: theme.fontWeights.bold,
        backgroundColor: '#0366d6',
        padding: 12,
        flexGrow: 1,
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: "center",
        textAlign: 'center',
        alignItems: "center",
        display : 'flex',
    },
});

const RepositoryItem = ({fullName, description, language, stars, forks, reviews, rating, ownerAvatarUrl, displayRepositoryButton, repositoryUrl}) => {
    return (
        <View testID="repositoryItem" style={styles.backGroundContainer}>
            <View style={styles.container}>
                <ImageComponent imageUrl={ownerAvatarUrl}/>
                <DescriptionComponent fullName={fullName} description={description} language={language}/>
            </View>
            <InfoComponent stars={stars} forks={forks} reviews={reviews} rating={rating}/>
            {displayRepositoryButton ? <><Pressable onPress={() => Linking.openURL(repositoryUrl)}><Text style={styles.openGithub}>Open in Github</Text></Pressable></> : <></>}
        </View>
    );
}

export default RepositoryItem