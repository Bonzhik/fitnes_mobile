import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, Image } from 'react-native';
import { UserService } from '../../api/userService';
import { UserDto } from '../../dtos/dtos';

const PersonalDataScreen = () => {
    const [user, setUser] = useState<UserDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await UserService.getCurrentUser();
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Не удалось загрузить данные пользователя.</Text>
            </View>
        );
    }

    return (
        <View style={styles.componentContainer}>
            {user && (
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
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 20,
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginVertical: 5,
    },
    loaderContainer: {
        flex: 1,
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
