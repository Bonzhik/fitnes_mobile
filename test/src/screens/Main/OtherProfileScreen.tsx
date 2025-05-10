import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { DayService } from '../../api/dayService';
import { ProductService } from '../../api/productService';
import { TrainingService } from '../../api/trainingService';
import { ProfileCommentService } from '../../api/profileCommentService';
import { DayR, ProductR, ProductItemR, TrainingR, ProfileCommentR, UserDto } from '../../dtos/dtos';
import ProfileCommentForm from '../../components/ProfileCommentForm';
import { UserService } from '../../api/userService';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const OtherProfileScreen = ({ route }) => {
  const { userId } = route.params;
  const [user, setUser] = useState<UserDto | null>(null);
  const navigation = useNavigation();
  const [currentDay, setCurrentDay] = useState<string | null>(null);
  const [days, setDays] = useState<DayR[]>([]);
  const [products, setProducts] = useState<ProductItemR[]>([]);
  const [trainings, setTrainings] = useState<TrainingR[]>([]);
  const [comments, setComments] = useState<ProfileCommentR[]>([]); // State for comments
  const [macros, setMacros] = useState({
    protein: 0,
    fats: 0,
    carbs: 0,
  });
  const [calories, setCalories] = useState(0);

  const fetchComments = async () => {
    const userComments = await ProfileCommentService.getComments(userId);
    setComments(userComments);
  };

  useEffect(() => {
    (async () => {
      const userDays = await DayService.getDaysByUser(userId);
      setDays(userDays);

      await fetchComments(); // используем функцию здесь

      const userResponse = await UserService.getUserById(userId);
      setUser(userResponse);

      const today = new Date().toISOString().split('T')[0];
      setCurrentDay(today);
    })();
  }, []);

  useEffect(() => {
    if (currentDay && days.length > 0) {
      fetchDayDetails(currentDay);
    }
  }, [currentDay, days]);

  const fetchDayDetails = async (dayDate: string) => {
    const day = days.find((d) => d.dayDate.split('T')[0] === dayDate.split('T')[0]);
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

  const handleAddToUser = async (trainingId: number) => {
    try {
      const response = await TrainingService.AppendToUser(trainingId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* UserINFO */}
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
              <Text style={styles.userText}>Рост: {user.height.toFixed(2)} см</Text>
              <Text style={styles.userText}>Вес: {user.weigth.toFixed(2)} кг</Text>
              <Text style={styles.userText}>Категория: {user.categoryR.categoryName}</Text>
              <Text style={styles.userText}>Пол: {user.gender === 0 ? 'Мужской' : 'Женский'}</Text>
              <Text style={styles.userText}>Описание: {user.description || 'Нет описания'}</Text>
              {user.rating > 0 && (
                <View style={styles.ratingContainer}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Text key={i} style={styles.star}>
                      {i < Math.round(user.rating) ? '★' : '☆'}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}
      </View>

      {/* Date Input */}
      <View style={styles.componentContainer}>
        <Calendar
          markedDates={{
            [currentDay || '']: { selected: true, selectedColor: 'blue' }, // Highlight the selected date
          }}
          onDayPress={(day) => { console.log('Day pressed'); handleDateInput(day.dateString); }}
        />
      </View>

      {
        days.some(d => d.dayDate.split("T")[0] == currentDay?.split("T")[0]) ? (
          <>
            {/* Chart Section */}
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

            {/* Products Section */}
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

            {/* Trainings Section */}
            <View style={styles.componentContainer}>
              <Text style={styles.sectionTitle}>Тренировки</Text>
              {trainings.map((item) => (
                <View key={item.id} style={styles.listItem}>
                  <Text>Тренировка - {item.name}</Text>
                  <Text>Создана: {item.createdBy.lastName} {item.createdBy.firstName}</Text>
                  <Text>{item.description}</Text>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.button, styles.viewButton]}
                      onPress={() => navigation.navigate('TrainingDetails', { trainingId: item.id })}
                    >
                      <Text style={styles.buttonText}>Посмотреть</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.addButton]}
                      onPress={() => handleAddToUser(item.id)}
                    >
                      <Text style={styles.buttonText}>Добавить себе</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.componentContainer}>
            <Image
              source={require("../../../assets/Zzz.png")}
              style={styles.ZzzContainer}
            />
          </View>
        )
      }


      {/* Comments */}
      <View style={styles.componentContainer}>
        <Text style={styles.sectionTitle}>Комментарии</Text>
        <ProfileCommentForm commentTo={userId} onCommentAdded={fetchComments} />
        {comments.map((item) => (
          <View key={item.id} style={styles.commentContainer}>
            <View style={styles.commentUserContainer}>
              <View style={styles.commentImageContainer}>
                <Image
                  source={item.userR.imageUrl ? { uri: item.userR.imageUrl } : require("../../../assets/default-image.jpg")}
                  style={styles.commentImage}
                />
                <Text style={styles.commentUserName}>
                  {item.userR.firstName} {item.userR.lastName}
                </Text>
              </View>

              <View style={styles.commentTextWithRating}>
                <Text style={styles.commentText}>{item.text}</Text>
                <View style={styles.ratingContainer}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Text key={i} style={styles.star}>
                      {i < Math.round(item.rating) ? '★' : '☆'}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  commentTextWithRating: {
    flex: 1,
    flexDirection: 'column', // Текст и звезды идут по вертикали
    justifyContent: 'center', // Центрируем контент по вертикали
    alignItems: 'flex-start',
  },
  commentText: {
    fontSize: 14,
    maxWidth: 220, // Ограничиваем ширину текста, чтобы он не вылезал
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 4, // Немного отступа между текстом и рейтингом
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 0.48,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#007BFF',
  },
  addButton: {
    backgroundColor: '#28A745',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  commentContainer: {
    flexDirection: 'row', // Картинка и текст идут по горизонтали
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Разделитель между комментариями
    alignItems: 'flex-start', // Выравнивание по верхнему краю
  },
  commentUserContainer: {
    flexDirection: 'row', // Картинка и текст в одну строку
    alignItems: 'flex-start', // Выравниваем элементы по верхнему краю
  },
  commentImageContainer: {
    marginRight: 10, // Отступ между картинкой и текстом
  },
  commentImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // половина от ширины/высоты
  },
  commentUserName: {
    marginTop: 5, // Отступ для фамилии и имени
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  ZzzContainer: {
    width: '90%',
    borderRadius: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  userText: {
    fontSize: 14,
    fontWeight: "bold",
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: 250,
    alignSelf: 'center'
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
  userInfoContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: "space-around",
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  userImage: {
    width: 130,
    height: 130,
    borderRadius: 40,
    marginRight: 16,
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
