import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import Colors from '../theme/colors';

function CommentCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Text style={styles.name}>{item.name}</Text>

      <Text>{item.email}</Text>

      <Text numberOfLines={2}>{item.body}</Text>
    </TouchableOpacity>
  );
}

export default React.memo(CommentCard);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  name: {
    fontWeight: 'bold',
    color: Colors.text,
  },
});
