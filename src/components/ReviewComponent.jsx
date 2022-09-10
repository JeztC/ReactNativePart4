import * as yup from "yup";
import {Formik} from "formik";
import {StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import useReview from "../hooks/useReview";

const initialValues = {
    repositoryName: '',
    ownerName: '',
    rating: '',
    text: '',
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexWrap: "wrap",
        alignItems: 'flex-start',
        alignContent: 'center',
    },
    createReview: {
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

const validationSchema = yup.object().shape({
    repositoryName: yup
        .string()
        .min(1, 'Repository owner must be greater or equal to 1 in length.')
        .required('Repository owner name is required'),
    ownerName: yup
        .string()
        .min(1, 'Repository name must be greater or equal to 1 in length.')
        .required('Repository name is required'),
    rating: yup
        .number()
        .min(1, 'Rating must be greater or less than 100.')
        .required('Rating is required'),
    text: yup.string()
});


const ReviewForm = ({ onSubmit }) => {
    return (
        <View>
            <View style={styles.container}>
                <FormikTextInput name="ownerName" placeholder="Repository owner name" />
                <FormikTextInput name="repositoryName" placeholder="Repository name" />
                <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
                <FormikTextInput multiline = {true} name="text" placeholder="Review" />
            </View>
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.createReview}>Create a review</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export const ReviewComponentContainer = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) =>
                <ReviewForm onSubmit={handleSubmit}
                />}
        </Formik>
    )
}

const ReviewComponent = () => {
    const [review] = useReview();

    const onSubmit = async (values) => {
        const { repositoryName, ownerName, rating, text } = values;
        try {
            await review({ repositoryName, ownerName, rating, text });
        } catch (e) {
            console.log(e);
        }
    };

    return <ReviewComponentContainer onSubmit={onSubmit} />;
};

export default ReviewComponent