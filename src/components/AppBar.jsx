import {View, StyleSheet, Pressable, ScrollView, Alert} from 'react-native';
import Constants from 'expo-constants';
import Text from "./Text";
import theme from "../theme";
import {Link, useNavigate} from "react-router-native";
import {useApolloClient, useQuery} from "@apollo/client";
import {GET_USER_INFO} from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
    backGroundContainer: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#24292e',
        paddingBottom: 15,
        paddingLeft: 15,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-around",
        alignItems: 'flex-end',
        alignContent: 'center',
        flexGrow: 1,
        paddingRight: 5,
    },
    flexItemA: {
        flex: 0,
        color: 'white',
        fontWeight: theme.fontWeights.bold,
    },
});

const AppBar = () => {
    const user = useQuery(GET_USER_INFO, {
        fetchPolicy: 'cache-and-network'
    });

    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigate = useNavigate()

    if (user.loading) {
        return <Text>Loading...</Text>
    }

    const logOut = async () => {
        navigate('/')
        await authStorage.removeAccessToken()
        await apolloClient.resetStore()
    }

    return <View style={styles.backGroundContainer}>{
        <View style={styles.container}>
            <ScrollView horizontal contentContainerStyle={styles.container}>
                <Pressable>
                    <Link to="/" style={styles.flexItemA}>
                        <Text style={styles.flexItemA}>Repositories</Text>
                    </Link>
                </Pressable>
                {user.data.me === null ?
                    <></> :
                    <Pressable>
                        <Link to="/review" style={styles.flexItemA}>
                            <Text style={styles.flexItemA}>Create a review</Text>
                        </Link>
                    </Pressable>
                }
                {user.data.me === null ?
                    <></> :
                    <Pressable>
                        <Link to="/userreviews" style={styles.flexItemA}>
                            <Text style={styles.flexItemA}>My reviews</Text>
                        </Link>
                    </Pressable>
                }
                {user.data.me === null ?
                    <Pressable>
                        <Link to="/signin" style={styles.flexItemA}>
                            <Text style={styles.flexItemA}>Sign in</Text>
                        </Link>
                    </Pressable> :
                    <Pressable
                        onPress={() => logOut()}
                    >
                        <Text style={styles.flexItemA}>Sign out</Text>
                    </Pressable>
                }
                {user.data.me === null ?
                    <Pressable>
                        <Link to="/signup" style={styles.flexItemA}>
                            <Text style={styles.flexItemA}>Sign up</Text>
                        </Link>
                    </Pressable> :
                    <></>
                }
            </ScrollView>
        </View>
    }</View>;
};

export default AppBar;