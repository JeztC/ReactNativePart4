import useRepositories from "../hooks/useRepositories";
import React, {useState} from "react";
import {useDebounce} from "use-debounce";
import {RepositoryListContainer} from "./RepositoryListContainer";
import {useNavigate} from "react-router-native";

const RepositoryList = () => {
    const [orderFunction, setOrderFunction] = useState({orderDirection : "DESC", orderBy : "CREATED_AT"})
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [debouncedText] = useDebounce(searchQuery, 500);
    const navigate = useNavigate()

    const { repositories, fetchMore } = useRepositories( {orderFunction, debouncedText, first: 7});

    const onEndReach = () => {
        fetchMore();
    };

    return <RepositoryListContainer repositories={repositories} onChangeSearch = {onChangeSearch} onEndReach={onEndReach} debouncedText = {debouncedText} setOrderFunction = {setOrderFunction} navigate = {navigate}/>;
};

export default RepositoryList;