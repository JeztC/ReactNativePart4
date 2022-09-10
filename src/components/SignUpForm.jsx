import {StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexWrap: "wrap",
        alignItems: 'flex-start',
        alignContent: 'center'
    },
    loginPanel: {
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
})

const SignUpForm = ({ onSubmit }) => {
    return (
        <View>
            <View style={styles.container}>
                <FormikTextInput name="username" placeholder="Username" />
                <FormikTextInput secureTextEntry = {true} name="password" placeholder="Password" />
                <FormikTextInput secureTextEntry = {true} name="passwordConfirm" placeholder="Password Confirmation" />
            </View>
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.loginPanel}>Sign up</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default SignUpForm;