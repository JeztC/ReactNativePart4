import {Alert, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import Text from "./Text";
import {format} from "date-fns";
import theme from "../theme";
import {useNavigate} from "react-router-native";
import {useApolloClient, useMutation, useQuery} from "@apollo/client";
import {DELETE_REVIEW, USE_SIGN_UP} from "../graphql/mutations";
import {GET_USER_INFO} from "../graphql/queries";

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
    buttonContainer: {
        flexDirection: 'row',
        flexGrow: 1,
        paddingRight : 80,
    },
    circleContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        flexGrow: 1,
        borderStyle: 'solid',
        height: 60,
        width: 60,
        borderRadius: 30,
        borderColor: '#00468b',
        borderWidth: 3,
        paddingRight: 60,
        marginRight: 30,
    },
    ratingItem: {
        paddingRight: 10,
        paddingLeft: 20,
        marginTop: 12,
        marginRight: 20,
        color: '#00468b',
    },
    textItem: {
        paddingRight: 70,
    },
    reviewContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexWrap: "wrap",
        flexGrow: 0,
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        marginRight: 50,
    },
    viewRepository: {
        color: 'white',
        fontWeight: theme.fontWeights.bold,
        backgroundColor: '#0366d6',
        padding: 12,
        flexGrow: 1,
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: "center",
        textAlign: 'center',
        alignItems: "center",
        display : 'flex',
    },
    deleteRepository: {
        color: 'white',
        fontWeight: theme.fontWeights.bold,
        backgroundColor: '#d60323',
        padding: 12,
        flexGrow: 1,
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: "center",
        textAlign: 'center',
        alignItems: "center",
        display : 'flex',
    },
})

export const UserReviewItem = ({ review }) => {
    const navigate = useNavigate()
    const [mutate] = useMutation(DELETE_REVIEW);

    const { refetch } = useQuery(GET_USER_INFO, {
        fetchPolicy: 'cache-and-network',
        variables: {includeReviews : true}
    });

    const deleteReview = async () =>
        Alert.alert(
            "Delete review",
            "Are you sure you want to delete this review?",
            [
                {
                    text: "CANCEL",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "DELETE", onPress: async () => {
                        await mutate({variables: {reviewId : review.id}});
                        await refetch()
                    }
                }
            ]
        );

    return (
        <View testID="repositoryItem" style={styles.backGroundContainer}>
            <View style={styles.container}>
                <View style={styles.circleContainer}>
                    <Text style={styles.ratingItem} fontWeight="bold" fontSize="subheading">{review.rating}</Text>
                </View>
                <View style={styles.reviewContainer}>
                    <Text style = {styles.textItem} fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
                    <Text style = {styles.textItem}> {format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
                    <Text style = {styles.textItem}>{review.text}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableWithoutFeedback onPress={() => navigate(`/${review.repository.id}`)}>
                            <Text style={styles.viewRepository}>View repository</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={deleteReview}>
                            <Text style={styles.deleteRepository}>Delete review</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </View>
    )
};

const ReviewItem = ({ review }) => {
    return (
        <View testID="repositoryItem" style={styles.backGroundContainer}>
            <View style={styles.container}>
                <View style={styles.circleContainer}>
                    <Text style={styles.ratingItem} fontWeight="bold" fontSize="subheading">{review.rating}</Text>
                </View>
                <View style={styles.reviewContainer}>
                    <Text style = {styles.textItem} fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
                    <Text style = {styles.textItem}> {format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
                    <Text style = {styles.textItem}>{review.text}</Text>
                </View>
            </View>
        </View>
    )
};

export default ReviewItem
