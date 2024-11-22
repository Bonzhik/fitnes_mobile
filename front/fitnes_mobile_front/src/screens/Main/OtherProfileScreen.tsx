import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OtherProfileScreen = ({ route }) => {
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профиль пользователя</Text>
      <Text>Идентификатор пользователя: {userId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default OtherProfileScreen;
