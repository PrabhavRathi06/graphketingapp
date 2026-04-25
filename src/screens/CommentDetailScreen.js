import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CommentDetailScreen({ route, navigation }) {
  const { comment } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: comment.name,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{comment.name}</Text>
      <Text>{comment.email}</Text>
      <Text>Post ID: {comment.postId}</Text>
      <Text>{comment.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
