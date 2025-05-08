import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
      <View style={styles.userContainer}>
        <Image
          source={item.imageUrl ? { uri: item.imageUrl } : require("../../../assets/default-image.jpg")}
          style={styles.userImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
          <Text style={styles.userCategory}>{item.categoryR.categoryName}</Text>
          {item.rating > 0 && (
            <View style={styles.ratingContainer}>
              {Array.from({ length: 5 }, (_, i) => (
                <Text key={i} style={styles.star}>
                  {i < Math.round(item.rating) ? '★' : '☆'}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Похожие пользователи</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  star: {
    color: '#FFD700',
    fontSize: 14,
    marginRight: 2,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userCategory: {
    fontSize: 18,
    color: '#666',
  },
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
});

export default ProfilesScreen;
