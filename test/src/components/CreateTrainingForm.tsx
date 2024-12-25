import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import { TrainingService } from '../api/trainingService';
import { ExerciseService } from '../api/exerciseService';
import { ExerciseR, TrainingW } from '../dtos/dtos';

const CreateTrainingForm = () => {
    const [exercises, setExercises] = useState<ExerciseR[]>([]);
    const [filteredExercises, setFilteredExercises] = useState<ExerciseR[]>([]);
    const [selectedExercises, setSelectedExercises] = useState<ExerciseR[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const exerciseData = await ExerciseService.getExercises();
            setExercises(exerciseData);
            setFilteredExercises(exerciseData)
        };
        fetchData();
    }, []);

    const handleExerciseSearch = async (text: string) => {
        const filtered = await ExerciseService.getExercisesByName(text);
        setFilteredExercises(filtered);
    };

    const addExercise = (exercise: ExerciseR) => {
        setSelectedExercises(prev => [...prev, exercise]);
    };

    return (
        <Formik
            initialValues={{ name: "test", description: "test", exerciseIds: [], categoryId: 1 }}
            enableReinitialize
            onSubmit={async (values, { resetForm }) => {
                try {
                    const newTraining: TrainingW = {
                        name: values.name,
                        description: values.description,
                        exerciseIds: selectedExercises.map(item => item.id),
                        categoryId: values.categoryId
                    };
                    await TrainingService.createTraining(newTraining);
                    resetForm();
                    setSelectedExercises([]);
                } catch (error) {
                    console.error(error);
                }
            }}
        >
            {({ handleChange, handleSubmit, values }) => (
                <ScrollView style={styles.container}>

                    <View style={styles.componentContainer}>
                        <Text style={styles.label}>Искать упражнения:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleExerciseSearch}
                            placeholder="Искать упражнения..."
                        />
                        {filteredExercises.map(exercise => (
                            <View key={exercise.id} style={styles.componentContainer}>
                                <View>
                                    <Text>Название: {exercise.name}</Text>
                                    <Text>Описание: {exercise.description}</Text>
                                    <TouchableOpacity
                                        style={styles.addButton}
                                        onPress={() => addExercise(exercise)}
                                    >
                                        <Text style={styles.addButtonText}>Добавить</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.componentContainer}>
                        <Text style={styles.label}>Выбранные упражнения:</Text>
                        {selectedExercises.map((exercise, index) => (
                            <View key={exercise.id} style={styles.componentContainer}>
                                <Text>Название: {exercise.name}</Text>
                                <Text>Описание: {exercise.description}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.componentContainer}>
                        <Text style={styles.label}>Название</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Введите название"
                            onChangeText={handleChange('name')} // Обновляет состояние формы
                            value={values.name} // Связывает поле с состоянием формы
                        />

                        <Text style={styles.label}>Описание</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Введите описание"
                            onChangeText={handleChange('description')} // Обновляет состояние формы
                            value={values.description} // Связывает поле с состоянием формы
                        />
                    </View>

                    <Button title="Submit" onPress={handleSubmit} />
                </ScrollView>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
    },
    addButton: {
        backgroundColor: '#007BFF',
        padding: 8,
        borderRadius: 4,
        marginTop: 8,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    selectedItem: {
        fontSize: 14,
        padding: 4,
        backgroundColor: '#F0F0F0',
        marginBottom: 4,
        borderRadius: 4,
    },
});

export default CreateTrainingForm;
