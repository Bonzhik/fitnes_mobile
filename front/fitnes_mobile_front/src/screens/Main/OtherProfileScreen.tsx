import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OtherProfileScreen = ({ route }) => {
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.content}>User ID: {userId}</Text>
      {/* You can expand this to fetch and display more user details */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
  },
});

export default OtherProfileScreen;