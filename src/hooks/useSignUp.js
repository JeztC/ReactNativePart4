import {useApolloClient, useMutation} from "@apollo/client";
import {USE_SIGN_UP} from "../graphql/mutations";
import useSignIn from "./useSignIn";
import {useNavigate} from "react-router-native";

const useSignUp = () => {
    const [mutate, result] = useMutation(USE_SIGN_UP);
    const apolloClient = useApolloClient();
    const [signIn] = useSignIn();
    const navigate = useNavigate()

    const signUp = async ({ username, password }) => {
        await mutate({variables: {username, password}});
        await apolloClient.resetStore();
        try {
            await signIn({ username, password });
            navigate('/')
        } catch (e) {
            console.log(e);
        }
    };

    return [signUp, result];
};

export default useSignUp