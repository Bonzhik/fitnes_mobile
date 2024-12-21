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
            <Text style={styles.title}>Training Details</Text>
            {training && (
                <View>
                    <Text style={styles.subtitle}>{training.name}</Text>
                    <Text>{training.description}</Text>
                </View>
            )}

            <Text style={styles.subtitle}>Exercises</Text>
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.listItem}>{item.name}</Text>
                )}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold' },
    subtitle: { fontSize: 18, marginTop: 16 },
    listItem: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default TrainingComponent;
