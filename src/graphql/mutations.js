import {gql} from "@apollo/client";

export const USE_SIGN_IN = gql`
    mutation authenticate($username: String!, $password: String!) {
        authenticate(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`

export const USE_SIGN_UP = gql`
    mutation createUser($username: String!, $password: String!) {
        createUser(user: { username: $username, password: $password }) {
            id
        }
    }
`

export const DELETE_REVIEW = gql`
    mutation deleteReview($reviewId: ID!) {
        deleteReview(id: $reviewId)
    }
`;

export const USE_ADD_REVIEW = gql`
    mutation createReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text : String) {
        createReview(review: { repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text : $text }) {
            repository {
                id
            }
        }
    }
`