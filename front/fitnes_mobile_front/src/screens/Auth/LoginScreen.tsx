import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Button, TouchableOpacity } from 'react-native';
import { AuthStackParamList } from '../../navigations/AuthStack';
import { TextInput } from 'react-native-gesture-handler';

type props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<props> = ({navigation}) => {
    return (
        <View>
            <TextInput placeholder="88005553535" />
            <TextInput placeholder="password" secureTextEntry />
            <TouchableOpacity>
                <Button title = "Login" />
            </TouchableOpacity>
            <Button title = "Go To Register" onPress={() => navigation.navigate('Register')}/>
        </View>
    );
};

export default LoginScreen;
