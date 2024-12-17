import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { ProductR, DayR, TrainingR, ProfileCommentR } from '../../dtos/dtos';
import { ProductService } from '../../api/productService';
import { DayService } from '../../api/dayService';
import { TrainingService } from '../../api/trainingService';
import { ProfileCommentService } from '../../api/profileCommentService';
import { getUserId } from '../../utils/storage';
import { Calendar } from 'react-native-calendars';
import CreateDayForm from '../../components/CreateDayForm';

const DiaryScreen = () => {
  const [userId, setUserId] = useState<Number | null>(null);
  const [currentDay, setCurrentDay] = useState<string | null>(null);
  const [days, setDays] = useState<DayR[]>([]);
  const [products, setProducts] = useState<ProductR[]>([]);
  const [trainings, setTrainings] = useState<TrainingR[]>([]);
  const [comments, setComments] = useState<ProfileCommentR[]>([]);
  const [macros, setMacros] = useState({ protein: 0, fats: 0, carbs: 0 });
  const [calories, setCalories] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    (async () => {
      const id = await getUserId();
      setUserId(id);
      const userDays = await DayService.getDaysByUser(id);
      setDays(userDays);

      const today = new Date().toISOString().split('T')[0];
      setCurrentDay(today);

      fetchDayDetails(today);

      const userComments = await ProfileCommentService.getComments(id);
      setComments(userComments);
    })();
  }, []);

  const fetchDayDetails = async (dayDate: string) => {
    const day = days.find((d) => d.dayDate.split("T")[0] === dayDate);
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
      setShowForm(false);
    } else {
      setProducts([]);
      setTrainings([]);
      setMacros({ protein: 0, fats: 0, carbs: 0 });
      setCalories(0);
      setShowForm(true);
    }
  };

  const handleDateSelect = (date: string) => {
    console.log("handleDateSelect");
    console.log(days);
    setCurrentDay(date);
    fetchDayDetails(date);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Calendar */}
      <Calendar
        markedDates={{
          [currentDay || '']: { selected: true, selectedColor: 'blue' }, // Highlight the selected date
        }}
        onDayPress={(day) => {console.log('Day pressed'); handleDateSelect(day.dateString);}}
      />

      {showForm ? (
        <CreateDayForm selectedDate={currentDay} /> // Передаем текущую дату в форму
      ) : (
        <>
          <Text style={styles.dateText}>{currentDay || 'Select a date'}</Text>

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
              </View>
            )}
          />

          {/* Comments */}
          <Text style={styles.sectionTitle}>Profile Comments</Text>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text>{item.userR.lastName} {item.userR.firstName}: {item.text}</Text>
              </View>
            )}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chart: {
    alignSelf: 'center',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
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
  caloriesText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default DiaryScreen;
