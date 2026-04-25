import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ErrorView({ onRetry }) {
  return (
    <View style={styles.container}>
      <Text>Something went wrong</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
