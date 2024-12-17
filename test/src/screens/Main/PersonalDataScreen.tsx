import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
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
        <View style={styles.container}>
            <Text style={styles.header}>Личная информация</Text>
            <Text style={styles.label}>Имя: {user.firstName} {user.lastName}</Text>
            <Text style={styles.label}>Email: {user.email}</Text>
            <Text style={styles.label}>Рост: {user.height} см</Text>
            <Text style={styles.label}>Вес: {user.weight} кг</Text>
            <Text style={styles.label}>Категория: {user.categoryR.categoryName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
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
