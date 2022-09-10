import {useApolloClient, useMutation} from "@apollo/client";
import {USE_ADD_REVIEW} from "../graphql/mutations";
import {useNavigate} from "react-router-native";

const useReview = () => {
    const [mutate, result] = useMutation(USE_ADD_REVIEW);
    const apolloClient = useApolloClient();
    const navigate = useNavigate()

    const review = async ({ repositoryName, ownerName, rating, text }) => {
        const { data } = await mutate({variables: {repositoryName, ownerName, rating : Number(rating), text}});
        await apolloClient.resetStore();
        navigate(`/${data.createReview.repository.id}`)
    };

    return [review, result];
};

export default useReview