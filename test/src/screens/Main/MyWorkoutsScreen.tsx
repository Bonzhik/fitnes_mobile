import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { TrainingR } from '../../dtos/dtos';
import { TrainingService } from '../../api/trainingService';
import { getUserId } from '../../utils/storage';
import { useNavigation } from '@react-navigation/native';

const MyWorkoutsScreen = () => {
  const navigation = useNavigation();
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
      <Text style={styles.title}>Мои тренировки</Text>

      <Button
        title="Создать тренировку"
        onPress={() => navigation.navigate('CreateTrainingForm')}
      />
      
      <FlatList
        data={trainings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.componentContainer}>
            <Text>Тренировка - {item.name} Создана: {item.createdBy.lastName} {item.createdBy.firstName}</Text>
            <Text>{item.description}</Text>
            <Text>-</Text>
            <Button
              title="Подробности"
              onPress={() =>
                navigation.navigate('TrainingDetails', {
                  trainingId: item.id,
                })
              }
            />
          </View>
        )}
      />
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
