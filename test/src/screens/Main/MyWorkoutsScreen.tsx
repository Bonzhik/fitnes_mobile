import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TrainingR } from '../../dtos/dtos';
import { TrainingService } from '../../api/trainingService';
import { getUserId } from '../../utils/storage';

const MyWorkoutsScreen = () => {
  const [trainings, setTrainings] = useState<TrainingR[]>([]);
  const [userId, setUserId] = useState<Number | null>(null);

  useEffect(() => {
    (async () => {
      const id = await getUserId();
      setUserId(id);
      if (id) {
        const userTrainings = await TrainingService.getTrainingsByUser(id);
        setTrainings(userTrainings);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Workouts</Text>
      <FlatList
        data={trainings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>Workout: {item.id}</Text>
            <Text>Created By: {item.createdBy.lastName} {item.createdBy.firstName}</Text>
          </View>
        )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
});

export default MyWorkoutsScreen;
