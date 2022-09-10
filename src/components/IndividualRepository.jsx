import {useParams} from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import {FlatList, StyleSheet, View} from "react-native";
import RepositoryItem from "./RepositoryItem";
import {useQuery} from "@apollo/client";
import {GET_REPOSITORY, GET_REVIEWS} from "../graphql/queries";
import Text from "./Text";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = () => {
    const orderFunction = {orderDirection: "DESC", orderBy: "CREATED_AT"};
    const { repositories } = useRepositories({orderFunction, debouncedText : "", first : 8});
    const repositoryId = useParams().id
    const repository = repositories
        ? repositories.edges.map((edge) => edge.node).find(r => r.id === repositoryId)
        : [];

    const repositoryInfo = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: {repositoryId}
    });

    if (repositoryInfo.loading) {
        return <Text>Loading...</Text>
    }

    return (
        <RepositoryItem
            fullName={repository.fullName}
            description={repository.description}
            language={repository.language}
            stars={repository.stargazersCount}
            forks={repository.forksCount}
            reviews={repository.reviewCount}
            rating={repository.ratingAverage}
            ownerAvatarUrl={repository.ownerAvatarUrl}
            displayRepositoryButton={true}
            repositoryUrl={repositoryInfo.data.repository.url}
        >
        </RepositoryItem>
    );
};

const IndividualRepository = () => {
    const repositoryId = useParams().id

    const reviews = useQuery(GET_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: {repositoryId}
    });

    if (reviews.loading) {
        return <Text>Loading...</Text>
    }

    const reviewNodes = reviews
        ? reviews.data.repository.reviews.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ repositoryId }) => repositoryId}
            ListHeaderComponent={() => <RepositoryInfo/>}
            ItemSeparatorComponent={ItemSeparator}
            // ...
        />
    );
}

export default IndividualRepository