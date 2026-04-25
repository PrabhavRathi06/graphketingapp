import React, { useCallback, useMemo, useState } from 'react';

import {
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from 'react-native';

import Loader from '../components/Loader';
import ErrorView from '../components/ErrorView';
import CommentCard from '../components/CommentCard';
import useComments from '../hooks/useComments';

export default function CommentsListScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const {
    comments,
    loading,
    error,
    loadingMore,
    refreshing,
    loadMore,
    retry,
    onRefresh,
  } = useComments();

  const handlePress = useCallback(
    item => {
      navigation.navigate('CommentDetail', {
        comment: item,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }) => <CommentCard item={item} onPress={handlePress} />,
    [handlePress],
  );

  const memoizedComments = useMemo(() => {
    return comments.filter(
      item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [comments, search]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorView onRetry={retry} />;
  }

  return (
    <>
      <TextInput
        placeholder="Search by name or email"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={memoizedComments}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      />
    </>
  );
}

const styles = StyleSheet.create({
  search: {
    margin: 10,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
});
