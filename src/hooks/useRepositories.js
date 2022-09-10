import {useQuery} from "@apollo/client";
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = (values) => {
    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: {orderBy : values.orderFunction.orderBy, orderDirection : values.orderFunction.orderDirection, searchKeyword : values.debouncedText, first : values.first}
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            },
        });
    };

    if (data?.loading) {
        return []
    }
    return {
        repositories: data?.repositories,
        fetchMore: handleFetchMore,
        loading,
        ...result,
    };
};

export default useRepositories;