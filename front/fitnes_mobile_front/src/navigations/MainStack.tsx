import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilesScreen from '../screens/Main/ProfilesScreen';
import UserTabs from '../screens/Main/UserTabs';
import OtherProfileScreen from '../screens/Main/OtherProfileScreen';
import UserWorkoutsScreen from '../screens/Main/UserWorkoutsScreen';
import { Button } from 'react-native';

export type MainStackParamList = {
  Profiles: undefined;
  UserTabs: undefined;
  OtherProfile: {userId: string};
  UserWorkouts: {userId: string};
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
        name = "UserWorkouts"
        component={UserWorkoutsScreen}
        options={({ navigation }) => ({
          title: 'Тренировки пользователя',
          headerRight: () => (
            <Button
              title="Мой профиль"
              onPress={() => navigation.navigate('UserTabs')}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
