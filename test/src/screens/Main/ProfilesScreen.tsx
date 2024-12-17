import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserService } from '../../api/userService';
import { UserDto } from '../../dtos/dtos';

const ProfilesScreen = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const filteredUsers = await UserService.getFilteredUsers();
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const renderUserItem = ({ item }: { item: UserDto }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => navigation.navigate('OtherProfile', { userId: item.id })}
    >
      <Text style={styles.userName}>{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtered Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  userItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  userName: {
    fontSize: 16,
  },
});

export default ProfilesScreen;
