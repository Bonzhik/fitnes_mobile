import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilesScreen from '../screens/Main/ProfilesScreen';
import UserTabs from '../screens/Main/UserTabs';
import OtherProfileScreen from '../screens/Main/OtherProfileScreen';
import { Button } from 'react-native';
import TrainingComponent from '../components/TrainingComponent';
import CreateTrainingForm from '../components/CreateTrainingForm';

export type MainStackParamList = {
  Profiles: undefined;
  UserTabs: undefined;
  OtherProfile: {userId: number};
  TrainingDetails: { trainingId: number };
  CreateTrainingForm: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profiles"
        component={ProfilesScreen}
        options={({ navigation }) => ({
          title: 'Пользователи',
          headerRight: () => (
            <Button
              title="Мой профиль"
              onPress={() => navigation.navigate('UserTabs')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="OtherProfile"
        component={OtherProfileScreen}
        options={({ navigation }) => ({
          title: 'Профиль пользователя',
          headerRight: () => (
            <Button
              title="Мой профиль"
              onPress={() => navigation.navigate('UserTabs')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="UserTabs"
        component={UserTabs}
        options={{ title: 'Мой профиль' }}
      />
      <Stack.Screen
        name="TrainingDetails" // Новый экран
        component={TrainingComponent}
        options={{ title: 'Детали тренировки' }}
      />
      <Stack.Screen
        name="CreateTrainingForm" // Новый экран
        component={CreateTrainingForm}
        options={{ title: 'Создание тренировки' }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
