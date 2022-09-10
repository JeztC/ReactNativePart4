import * as yup from "yup";
import {Formik} from "formik";
import SignUpForm from "./SignUpForm";
import useSignIn from "../hooks/useSignIn";
import {useNavigate} from "react-router-native";
import useSignUp from "../hooks/useSignUp";

const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1, 'Username must be greater or equal to 1 in length.')
        .max(30, 'Username must be less or equal to 30 in length.')
        .required('Username is required'),
    password: yup
        .string()
        .min(5, 'Password must be greater or equal to 5 in length.')
        .max(50, 'Password must be less or equal to 50 in length.')
        .required('Password is required'),
    passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null])
        .required('Password confirmation is required')
});

export const SignUpContainer = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) =>
                <SignUpForm onSubmit={handleSubmit}
                />}
        </Formik>
    )
}

const SignUp = () => {
    const [signUp] = useSignUp();

    const onSubmit = async (values) => {
        console.log(values)
        const { username, password } = values;

        try {
            await signUp({ username, password });
        } catch (e) {
            console.log(e);
        }
    };

    return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;