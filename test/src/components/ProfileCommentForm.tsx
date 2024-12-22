import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ProfileCommentService } from '../api/profileCommentService';

const ProfileCommentForm = ({ commentTo }) => {
    // Валидация формы с использованием Yup
    const validationSchema = Yup.object({
        text: Yup.string()
            .required('Комментарий обязателен')
            .min(3, 'Комментарий должен содержать минимум 3 символа'),
    });

    // Начальные значения формы
    const initialValues = {
        text: '',
    };

    // Обработчик отправки формы
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const profileCommentW = { text: values.text, commentTo };
            const success = await ProfileCommentService.createProfileComment(profileCommentW);
            if (success) {
                Alert.alert('Успех', 'Комментарий отправлен!');
                resetForm();
            } else {
                Alert.alert('Ошибка', 'Не удалось отправить комментарий');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Ошибка', 'Произошла ошибка при отправке комментария');
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.componentContainer}>
                    <TextInput
                        style={[styles.textArea, touched.text && errors.text ? styles.errorInput : null]}
                        placeholder="Введите ваш комментарий"
                        multiline
                        numberOfLines={4}
                        onChangeText={handleChange('text')}
                        onBlur={handleBlur('text')}
                        value={values.text}
                    />
                    {touched.text && errors.text && (
                        <Text style={styles.errorText}>{errors.text}</Text>
                    )}
                    <Button title="Отправить" onPress={handleSubmit} />
                </View>
            )}
        </Formik>
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
      },
    textArea: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
        textAlignVertical: 'top',
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
    },
});

export default ProfileCommentForm;
