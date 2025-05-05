import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import { DayService } from '../api/dayService';
import { ProductService } from '../api/productService';
import { TrainingService } from '../api/trainingService';
import { DayW } from '../dtos/dtos';
import { ProductR, ProductItemR, TrainingR } from '../dtos/dtos';

interface CreateDayFormProps {
  selectedDate: string;
}

const CreateDayForm: React.FC<CreateDayFormProps> = ({ selectedDate }) => {
  const [products, setProducts] = useState<ProductR[]>([]);
  const [trainings, setTrainings] = useState<TrainingR[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductR[]>([]);
  const [filteredTrainings, setFilteredTrainings] = useState<TrainingR[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductItemR[]>([]);
  const [selectedTrainings, setSelectedTrainings] = useState<TrainingR[]>([]);
  const [productCountMap, setProductCountMap] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await ProductService.getProducts();
      const trainingsData = await TrainingService.getTrainings();
      setProducts(productsData);
      setFilteredProducts(productsData);
      setTrainings(trainingsData);
      setFilteredTrainings(trainingsData);
    };
    fetchData();
  }, []);

  const handleProductSearch = async (text: string) => {
    const filtered = await ProductService.getProductsByName(text);
    setFilteredProducts(filtered);
  };

  const handleTrainingSearch = async (text: string) => {
    const filtered = await TrainingService.getTrainingsByName(text);
    setFilteredTrainings(filtered);
  };

  const addProduct = (product: ProductR) => {
    const count = productCountMap[product.id] || 1;
    const productItem: ProductItemR = { product, count };
    setSelectedProducts(prev => [...prev, productItem]);
    setProductCountMap(prev => {
      const newMap = { ...prev };
      delete newMap[product.id];
      return newMap;
    });
  };

  const addTraining = (training: TrainingR) => {
    setSelectedTrainings(prev => [...prev, training]);
  };

  return (
    <Formik
      initialValues={{ dayDate: selectedDate, productIds: [], trainingIds: [] }}
      enableReinitialize
      onSubmit={async (values, { resetForm }) => {
        try {
          const newDay: DayW = {
            dayDate: values.dayDate,
            productIds: selectedProducts.map(item => item.product.id),
            trainingIds: selectedTrainings.map(item => item.id),
          };
          await DayService.createDay(newDay);
          resetForm();
          setSelectedProducts([]);
          setSelectedTrainings([]);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <ScrollView style={styles.container}>

          <View style={styles.componentContainer}>
            <Text style={styles.label}>Искать продукты:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleProductSearch}
              placeholder="Искать продукты..."
            />
            {filteredProducts.map(product => (
              <View key={product.id} style={styles.productContainer}>
                <View style={styles.productLeft}>
                  <Image
                    source={product.imageUrl ? { uri: product.imageUrl } : require("../../assets/default-product.jpg")}
                    style={styles.productImage}
                  />
                  <Text style={styles.productName}>{product.name}</Text>
                </View>
                <View style={styles.productRight}>
                  <Text>Жиры: {product.fats}</Text>
                  <Text>Углеводы: {product.carbohydrates}</Text>
                  <Text>Белки: {product.proteins}</Text>
                  <Text>Калории: {product.kcals}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Кол-во (граммы)"
                    keyboardType="numeric"
                    value={productCountMap[product.id]?.toString() || ''}
                    onChangeText={(text) =>
                      setProductCountMap(prev => ({
                        ...prev,
                        [product.id]: parseInt(text) || 1,
                      }))
                    }
                  />
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addProduct(product)}
                  >
                    <Text style={styles.addButtonText}>Добавить</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))} 
          </View>

          <View style={styles.componentContainer}>
            <Text style={styles.label}>Выбранные продукты:</Text>
            {selectedProducts.map((item, index) => (
              <View key={item.product.id} style={styles.productContainer}>
                <View style={styles.productLeft}>
                  <Image
                    source={item.product.imageUrl ? { uri: item.product.imageUrl } : require("../../assets/default-product.jpg")}
                    style={styles.productImage}
                  />
                  <Text style={styles.productName}>{item.product.name}</Text>
                </View>
                <View style={styles.productRight}>
                  <Text>Жиры: {item.product.fats}</Text>
                  <Text>Углеводы: {item.product.carbohydrates}</Text>
                  <Text>Белки: {item.product.proteins}</Text>
                  <Text>Калории: {item.product.kcals}</Text>
                  <Text>Количество: {item.count} г</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.componentContainer}>
            <Text style={styles.label}>Искать тренировки:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleTrainingSearch}
              placeholder="Искать тренировки..."
            />
            {filteredTrainings.map(training => (
              <View key={training.id}>
                <Text>Тренировка {training.name} Создана: {training.createdBy.firstName} {training.createdBy.lastName}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addTraining(training)}
                >
                  <Text style={styles.addButtonText}>Добавить</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.componentContainer}>
            <Text style={styles.label}>Выбранные тренировки:</Text>
            {selectedTrainings.map((item, index) => (
              <Text key={index} style={styles.selectedItem}>
                Тренировка {item.name} Создана: {item.createdBy.firstName} {item.createdBy.lastName}
              </Text>
            ))}
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
  dateContainer: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
});

export default CreateDayForm;
