import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Formik } from 'formik';
import { DayService } from '../api/dayService';
import { ProductService } from '../api/productService';
import { TrainingService } from '../api/trainingService';
import { DayW } from '../dtos/dtos';
import { ProductR, TrainingR } from '../dtos/dtos';

const CreateDayForm = () => {
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
      training.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTrainings(filtered);
  };

  const toggleProductSelection = (id: number) => {
    setSelectedProductIds(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const toggleTrainingSelection = (id: number) => {
    setSelectedTrainingIds(prev =>
      prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
    );
  };

  return (
    <Formik
      initialValues={{ dayDate: '', productIds: [], trainingIds: [] }}
      onSubmit={async (values, { resetForm }) => {
        try {
          const newDay: DayW = {
            dayDate: values.dayDate,
            productIds: selectedProductIds,
            trainingIds: selectedTrainingIds,
          };
          await DayService.createDay(newDay);
          resetForm();
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <ScrollView style={styles.container}>
          <Text style={styles.label}>Date (ISO format):</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('dayDate')}
            value={values.dayDate}
            placeholder="YYYY-MM-DD"
          />

          <Text style={styles.label}>Search Products:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleProductSearch}
            placeholder="Search products..."
          />
          {filteredProducts.map(product => (
            <View key={product.id} style={styles.itemContainer}>
              <Text>{product.name}</Text>
              <CheckBox
                value={selectedProductIds.includes(product.id)}
                onValueChange={() => toggleProductSelection(product.id)}
              />
            </View>
          ))}

          <Text style={styles.label}>Search Trainings:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleTrainingSearch}
            placeholder="Search trainings..."
          />
          {filteredTrainings.map(training => (
            <View key={training.id} style={styles.itemContainer}>
              <Text>{training.name}</Text>
              <CheckBox
                value={selectedTrainingIds.includes(training.id)}
                onValueChange={() => toggleTrainingSelection(training.id)}
              />
            </View>
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
});

export default CreateDayForm;