import {useApolloClient, useMutation} from "@apollo/client";
import {USE_SIGN_IN} from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const [mutate, result] = useMutation(USE_SIGN_IN);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        const { data } = await mutate({variables: {username, password}});
        await authStorage.setAccessToken(data.authenticate.accessToken);
        await apolloClient.resetStore();
    };

    return [signIn, result];
};

export default useSignIn