import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiaryScreen from "./DiaryScreen";
import MyWorkoutsScreen from "./MyWorkoutsScreen";
import PersonalDataScreen from "./PersonalDataScreen";
import ProfileSettingScreen from "./ProfileSettingScreen";

export type UserTabParamList = {
    Diary: undefined;
    ProfileSetting: undefined;
    PersonalData: undefined;
    MyWorkouts: undefined;
  };

const Tab = createBottomTabNavigator<UserTabParamList>();

const UserTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Diary" component={DiaryScreen} options={{ title: 'Дневник' }} />
            <Tab.Screen name="ProfileSetting" component={ProfileSettingScreen} options={{ title: 'Настройки профиля' }} />
            <Tab.Screen name="PersonalData" component={PersonalDataScreen} options={{ title: 'Личные данные' }} />
            <Tab.Screen name="MyWorkouts" component={MyWorkoutsScreen} options={{ title: 'Мои тренировки' }} />
        </Tab.Navigator>
    );
};

export default UserTabs;
