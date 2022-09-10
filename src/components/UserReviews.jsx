import {useQuery} from "@apollo/client";
import {GET_USER_INFO} from "../graphql/queries";
import Text from "./Text";
import {FlatList, StyleSheet, View} from "react-native";
import ReviewItem, {UserReviewItem} from "./ReviewItem";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
    const reviews = useQuery(GET_USER_INFO, {
        fetchPolicy: 'cache-and-network',
        variables: {includeReviews : true}
    });

    if (reviews.loading) {
        return <Text>Loading...</Text>
    }

    const reviewNodes = reviews
        ? reviews.data.me.reviews.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <UserReviewItem review={item} />}
            keyExtractor={({ repositoryId }) => repositoryId}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
}

export default UserReviews
