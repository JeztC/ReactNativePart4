import {FlatList, Pressable, StyleSheet, View} from "react-native";
import React from "react";
import RepositoryItem from "./RepositoryItem";
import {Searchbar} from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        return (
            <View>
                <Searchbar
                    searchIcon={{ size: 24 }}
                    placeholder="Search"
                    onChangeText={this.props.onChangeSearch}
                    value={this.props.debouncedText}
                />
                <RNPickerSelect
                    onValueChange={(value) => this.props.setOrderFunction(value)}
                    items={[
                        { label: 'Latest repositories', value: {orderDirection : "DESC", orderBy : "CREATED_AT"} },
                        { label: 'Highest rated repositories', value: {orderDirection : "DESC", orderBy : "RATING_AVERAGE"} },
                        { label: 'Lowest rated repositories', value: {orderDirection : "ASC", orderBy : "RATING_AVERAGE"} },
                    ]}
                />
            </View>
        );
    };

    render() {
        const repositoryNodes = this.props.repositories
            ? this.props.repositories.edges.map((edge) => edge.node)
            : [];
        return (
            <View>
                <FlatList
                    data={repositoryNodes}
                    ItemSeparatorComponent={ItemSeparator}
                    keyExtractor={({ item }) => item}
                    ListHeaderComponent={this.renderHeader}
                    onEndReached={() => this.props.onEndReach}
                    onEndReachedThreshold={0.5}
                    renderItem={(item) => (
                        <Pressable onPress={() => this.props.navigate(`./${item.item.id}`)} >
                            <RepositoryItem
                                fullName={item.item.fullName}
                                description={item.item.description}
                                language={item.item.language}
                                stars={item.item.stargazersCount}
                                forks={item.item.forksCount}
                                reviews={item.item.reviewCount}
                                rating={item.item.ratingAverage}
                                ownerAvatarUrl={item.item.ownerAvatarUrl}
                                displayRepositoryButton={false}
                            >
                            </RepositoryItem>
                        </Pressable>
                    )}
                />
            </View>
        );
    }
}