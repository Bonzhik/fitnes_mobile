import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { DayService } from '../api/dayService';
import { ProductService } from '../api/productService';
import { TrainingService } from '../api/trainingService';
import { DayW } from '../dtos/dtos';
import { ProductR, TrainingR } from '../dtos/dtos';

interface CreateDayFormProps {
  selectedDate: string; // Pass selected date as prop
}

const CreateDayForm: React.FC<CreateDayFormProps> = ({ selectedDate }) => {
  const [products, setProducts] = useState<ProductR[]>([]);
  const [trainings, setTrainings] = useState<TrainingR[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductR[]>([]);
  const [filteredTrainings, setFilteredTrainings] = useState<TrainingR[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [selectedTrainingIds, setSelectedTrainingIds] = useState<number[]>([]);

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

  const handleProductSearch = (text: string) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleTrainingSearch = (text: string) => {
    const filtered = trainings.filter(training =>
      training.id.toString().includes(text.toLowerCase())
    );
    setFilteredTrainings(filtered);
  };

  const addProduct = (id: number) => {
    setSelectedProductIds(prev => [...prev, id]);
  };

  const addTraining = (id: number) => {
    setSelectedTrainingIds(prev => [...prev, id]);
  };

  return (
    <Formik
      initialValues={{ dayDate: selectedDate, productIds: [], trainingIds: [] }}
      enableReinitialize
      onSubmit={async (values, { resetForm }) => {
        try {
          const newDay: DayW = {
            dayDate: values.dayDate,
            productIds: selectedProductIds,
            trainingIds: selectedTrainingIds,
          };
          await DayService.createDay(newDay);
          resetForm();
          setSelectedProductIds([]);
          setSelectedTrainingIds([]);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <ScrollView style={styles.container}>
          <View style={styles.dateContainer}>
            <Text style={styles.label}>Selected Date:</Text>
            <Text style={styles.dateText}>{selectedDate}</Text>
          </View>

          <Text style={styles.label}>Search Products:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleProductSearch}
            placeholder="Search products..."
          />
          {filteredProducts.map(product => (
            <View key={product.id} style={styles.itemContainer}>
              <Text>{product.name}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addProduct(product.id)}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={styles.label}>Selected Products:</Text>
          {selectedProductIds.map((id, index) => (
            <Text key={index} style={styles.selectedItem}>
              Product ID: {id}
            </Text>
          ))}

          <Text style={styles.label}>Search Trainings:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleTrainingSearch}
            placeholder="Search trainings..."
          />
          {filteredTrainings.map(training => (
            <View key={training.id} style={styles.itemContainer}>
              <Text>Training ID: {training.id}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addTraining(training.id)}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={styles.label}>Selected Trainings:</Text>
          {selectedTrainingIds.map((id, index) => (
            <Text key={index} style={styles.selectedItem}>
              Training ID: {id}
            </Text>
          ))}

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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 4,
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
