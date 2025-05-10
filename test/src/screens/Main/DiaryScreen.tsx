import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { ProductR, ProductItemR, DayR, TrainingR, ProfileCommentR } from '../../dtos/dtos';
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
  const [products, setProducts] = useState<ProductItemR[]>([]);
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

      const userComments = await ProfileCommentService.getComments(id);
      setComments(userComments);
    })();
  }, []);

  useEffect(() => {
    if (currentDay && days.length > 0) {
      fetchDayDetails(currentDay);
    }
  }, [currentDay, days]);

  const fetchDayDetails = async (dayDate: string) => {
    const day = days.find((d) => d.dayDate.split("T")[0] === dayDate);
    if (day) {
      const dayProducts = await ProductService.getProductsByDay(day.id);
      const dayTrainings = await TrainingService.getTrainingsByDay(day.id);

      setProducts(dayProducts);
      setTrainings(dayTrainings);

      const totalMacros = dayProducts.reduce(
        (totals, product) => ({
          protein: Math.round((totals.protein + product.product.proteins * product.count / 100) * 10) / 10,
          fats: Math.round((totals.fats + product.product.fats * product.count / 100) * 10) / 10,
          carbs: Math.round((totals.carbs + product.product.carbohydrates * product.count / 100) * 10) / 10,
        }),
        { protein: 0, fats: 0, carbs: 0 }
      );
      setMacros(totalMacros);

      const totalCalories = Math.round(
        dayProducts.reduce((sum, product) => sum + product.product.kcals * product.count / 100, 0) * 10
      ) / 10;

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
      <View style={styles.componentContainer}>
        <Calendar
          markedDates={{
            [currentDay || '']: { selected: true, selectedColor: 'blue' }, // Highlight the selected date
          }}
          onDayPress={(day) => { console.log('Day pressed'); handleDateSelect(day.dateString); }}
        />
      </View>

      {showForm ? (
        <CreateDayForm
          selectedDate={currentDay}
          onDayCreated={async () => {
            // 🔹 Повторно загружаем список дней и детали текущего дня
            const userDays = await DayService.getDaysByUser(userId);
            setDays(userDays);
            fetchDayDetails(currentDay!);
          }}
        />
      ) : (
        <>

          {/* Macros and Calories */}
          <View style={styles.componentContainer}>
            <View style={styles.chartContainer}>
              <PieChart
                data={[
                  { name: 'Белки', population: macros.protein, color: 'blue', legendFontColor: '#7F7F7F', legendFontSize: 12 },
                  { name: 'Жиры', population: macros.fats, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 12 },
                  { name: 'Углеводы', population: macros.carbs, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 12 },
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
              <Text style={styles.caloriesText}>Калории: {calories} ккал</Text>
            </View>
          </View>

          {/* Products */}
          <View style={styles.componentContainer}>
            <Text style={styles.sectionTitle}>Продукты</Text>
            {products.map((item) => (
              <View key={item.product.id} style={styles.productContainer}>
                <View style={styles.productLeft}>
                  <Image
                    source={item.product.imageUrl ? { uri: item.product.imageUrl } : require("../../../assets/default-product.jpg")}
                    style={styles.productImage}
                  />
                  <Text style={styles.productName}>{item.product.name}</Text>
                </View>
                <View style={styles.productRight}>
                  <Text>Жиры: {item.product.fats}</Text>
                  <Text>Углеводы: {item.product.carbohydrates}</Text>
                  <Text>Белки: {item.product.proteins}</Text>
                  <Text>Калории: {item.product.kcals}</Text>
                  <Text>Грамм: {item.count}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Trainings */}
          <View style={styles.componentContainer}>
            <Text style={styles.sectionTitle}>Тренировки</Text>
            {trainings.map((item) => (
              <View key={item.id} style={styles.listItem}>
                <Text>Тренировка - {item.name}
                  Создана: {item.createdBy.lastName} {item.createdBy.firstName}</Text>
              </View>
            ))}
          </View>

          {/* Comments */}
          <View style={styles.componentContainer}>
            <Text style={styles.sectionTitle}>Комментарии</Text>
            {comments.map((item) => (
              <View key={item.id} style={styles.commentContainer}>
                <View style={styles.commentUserContainer}>
                  <View style={styles.commentImageContainer}>
                    <Image
                      source={item.userR.imageUrl ? { uri: item.userR.imageUrl } : require("../../../assets/default-image.jpg")}
                      style={styles.commentImage}
                    />
                  </View>
                  <View style={styles.commentTextWithRating}>
                    <Text style={styles.commentUserName}>
                      {item.userR.firstName} {item.userR.lastName}
                    </Text>
                    <Text style={styles.commentText}>{item.text}</Text>
                    <View style={styles.ratingContainer}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Text key={i} style={styles.star}>
                          {i < item.rating ? '★' : '☆'}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  commentTextWithRating: {
    flex: 1,
    flexDirection: 'column', // Чтобы текст и звёзды шли друг под другом
    alignItems: 'flex-start',
  },
  commentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  star: {
    color: '#FFD700',
    fontSize: 16,
    marginLeft: 1,
  },
  commentContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  commentRating: {
    flexDirection: 'row',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productLeft: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 16,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  productRight: {
    flex: 1,
    justifyContent: 'space-around',
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
  commentContainer: {
    flexDirection: 'row', // Размещаем элементы в строку
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Для разделения комментариев
    alignItems: 'flex-start', // Выравнивание по верхнему краю
  },
  commentUserContainer: {
    flexDirection: 'row', // Размещаем картинку и комментарий по горизонтали
    alignItems: 'flex-start', // Выравниваем по верхнему краю
  },
  commentImageContainer: {
    alignItems: 'center', // Выравнивание картинки и имени по центру
    marginRight: 10, // Отступ между картинкой и текстом
  },
  commentImage: {
    width: 75,
    height: 75,
    borderRadius: 40,
  },
  commentUserName: {
    marginTop: 5, // Отступ для фамилии и имени
    textAlign: 'center',
  },
  commentText: {
    flex: 1, // Заполняем оставшееся пространство
    marginTop: 5, // Отступ сверху
    textAlign: 'left', // Текст комментария слева
  },
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
