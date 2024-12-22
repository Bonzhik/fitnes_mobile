import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { TrainingService } from '../api/trainingService';
import { ExerciseService } from '../api/exerciseService';
import { ExerciseR, TrainingR } from '../dtos/dtos';

const TrainingComponent = ({ route }) => {
    const { trainingId } = route.params; // Получаем trainingId из params
    const [training, setTraining] = useState<TrainingR | null>(null);
    const [exercises, setExercises] = useState<ExerciseR[] | null>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trainingData = await TrainingService.getTraining(trainingId);
                setTraining(trainingData);

                const exerciseData = await ExerciseService.getExercisesByTraining(trainingId);
                setExercises(exerciseData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [trainingId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Детали тренировки</Text>

            <View style={styles.componentContainer}>
                <Text style={styles.subtitle}>Название - {training?.name}</Text>
                <Text>{training?.description}</Text>
            </View>

            <View style={styles.componentContainer}>
                <Text style={styles.subtitle}>Упражнения</Text>
                <FlatList
                    data={exercises}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <>
                            <View style={styles.listItem}>
                                <Text>Название - {item.name}</Text>
                                <Text>{item.description}</Text>
                            </View>
                        </>
                    )}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
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
        marginTop: 10
    },
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', alignSelf: 'center', textAlign: 'center' },
    subtitle: { fontSize: 18, marginTop: 16 },
    listItem: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default TrainingComponent;
