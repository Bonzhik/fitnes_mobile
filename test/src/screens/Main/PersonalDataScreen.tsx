import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, Image } from 'react-native';
import { UserService } from '../../api/userService';
import { UserDto } from '../../dtos/dtos';
import { ScrollView } from 'react-native-gesture-handler';

const PersonalDataScreen = () => {
    const [user, setUser] = useState<UserDto | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await UserService.getCurrentUser();
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, []);


    return (
        <ScrollView style={styles.container}>
        {user ? (
            <View style={styles.componentContainer}>
                <View style={styles.userInfoContainer}>
                    <Image
                        source={user.imageUrl ? { uri: user.imageUrl } : require("../../../assets/default-image.jpg")}
                        style={styles.userImage}
                    />
                    <View>
                        <Text style={styles.userText}>{user.firstName} {user.lastName}</Text>
                        <Text style={styles.userText}>{user.email}</Text>
                        <Text style={styles.userText}>Рост: {user.height} см</Text>
                        <Text style={styles.userText}>Вес: {user.weigth} кг</Text>
                        <Text style={styles.userText}>Категория: {user.categoryR.categoryName}</Text>
                    </View>
                </View>
            </View>
        ) : (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )}
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Занимает всё пространство экрана
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    componentContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    userText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    userInfoContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 40,
        marginRight: 16,
    },
    loaderContainer: {
        flex: 1, // Центрирование на всём экране
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
});

export default PersonalDataScreen;
