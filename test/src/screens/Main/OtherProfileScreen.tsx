import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ScrollView, TextInput } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { DayService } from '../../api/dayService';
import { ProductService } from '../../api/productService';
import { TrainingService } from '../../api/trainingService';
import { ProfileCommentService } from '../../api/profileCommentService';
import { DayR, ProductR, TrainingR, ProfileCommentR } from '../../dtos/dtos';
import ProfileCommentForm from '../../components/ProfileCommentForm';
import { date } from 'yup';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const OtherProfileScreen = ({ route }) => {
  const { userId } = route.params;
  const navigation = useNavigation();
  const [currentDay, setCurrentDay] = useState<string | null>(null);
  const [days, setDays] = useState<DayR[]>([]);
  const [products, setProducts] = useState<ProductR[]>([]);
  const [trainings, setTrainings] = useState<TrainingR[]>([]);
  const [comments, setComments] = useState<ProfileCommentR[]>([]); // State for comments
  const [macros, setMacros] = useState({
    protein: 0,
    fats: 0,
    carbs: 0,
  });
  const [calories, setCalories] = useState(0);
  const [inputDate, setInputDate] = useState('');

  useEffect(() => {
    (async () => {
      const userDays = await DayService.getDaysByUser(userId);
      setDays(userDays);

      const userComments = await ProfileCommentService.getComments(userId);
      setComments(userComments);

      const today = new Date().toISOString().split('T')[0]; // Формат YYYY-MM-DD
      setCurrentDay(today);

      const todayDay = userDays.find((d) => d.dayDate.split('T')[0] === today);
      if (todayDay) {
        fetchDayDetails(today);
      }
    })();
  }, []);

  const fetchDayDetails = async (dayDate: string) => {
    const day = days.find((d) => d.dayDate.split('T')[0] === dayDate.split('T')[0]);
    if (day) {
      const dayProducts = await ProductService.getProductsByDay(day.id);
      const dayTrainings = await TrainingService.getTrainingsByDay(day.id);

      setProducts(dayProducts);
      setTrainings(dayTrainings);

      const totalMacros = dayProducts.reduce(
        (totals, product) => ({
          protein: totals.protein + product.proteins,
          fats: totals.fats + product.fats,
          carbs: totals.carbs + product.carbohydrates,
        }),
        { protein: 0, fats: 0, carbs: 0 }
      );
      setMacros(totalMacros);

      const totalCalories = dayProducts.reduce((sum, product) => sum + product.kcals, 0);
      setCalories(totalCalories);
    } else {
      setProducts([]);
      setTrainings([]);
      setMacros({ protein: 0, fats: 0, carbs: 0 });
      setCalories(0);
    }
  };

  const handleDateInput = (selectedDate: string) => {
      setCurrentDay(selectedDate);
      fetchDayDetails(selectedDate);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Date Input */}
      <Calendar
        markedDates={{
          [currentDay || '']: { selected: true, selectedColor: 'blue' }, // Highlight the selected date
        }}
        onDayPress={(day) => {console.log('Day pressed'); handleDateInput(day.dateString);}}
      />

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{currentDay || 'Select a date'}</Text>
      </View>


      {/* Macros and Calories */}
      <View style={styles.chartContainer}>
        <PieChart
          data={[
            { name: 'Protein', population: macros.protein, color: 'blue', legendFontColor: '#7F7F7F', legendFontSize: 12 },
            { name: 'Fats', population: macros.fats, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 12 },
            { name: 'Carbs', population: macros.carbs, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 12 },
          ]}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
        />
        <Text style={styles.caloriesText}>Calories: {calories} kcal</Text>
      </View>

      {/* Products */}
      <Text style={styles.sectionTitle}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>
              {item.name} - {item.kcals} kcal
            </Text>
          </View>
        )}
      />

      {/* Trainings */}
      <Text style={styles.sectionTitle}>Trainings</Text>
      <FlatList
        data={trainings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>Training created by: {item.createdBy.lastName} {item.createdBy.firstName}</Text>
            <Button
              title="View Training"
              onPress={() =>
                navigation.navigate('TrainingDetails', {
                  trainingId: item.id,
                })
              }
            />
          </View>
        )}
      />

      <ProfileCommentForm commentTo={userId}/>

      {/* Comments */}
      <Text style={styles.sectionTitle}>Profile Comments</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.userR.firstName} {item.userR.lastName}: {item.text}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chart: {
    alignSelf: 'center',
  },
  caloriesText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateContainer: {
    alignItems: 'center', // Горизонтальное центрирование
    justifyContent: 'center', // Вертикальное центрирование
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    textAlign: 'center', // Центрирование текста внутри элемента
  },
});

export default OtherProfileScreen;
