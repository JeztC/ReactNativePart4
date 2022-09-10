import { StyleSheet, View } from 'react-native';
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from "./SignIn";
import IndividualRepository from "./IndividualRepository";
import ReviewComponent from "./ReviewComponent";
import SignUp from "./SignUp";
import UserReviews from "./UserReviews";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e1e4e8',
        flexGrow: 1,
        flexShrink: 1,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar/>
            <Routes>
                <Route path="/" element={<RepositoryList />} exact />
                <Route path ="/:id" element = {<IndividualRepository/>} exact/>
                <Route path ="/userreviews" element = {<UserReviews/>} exact/>
                <Route path="/review" element={<ReviewComponent />} exact />
                <Route path="/signin" element={<SignIn />} exact />
                <Route path="/signup" element={<SignUp />} exact />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;