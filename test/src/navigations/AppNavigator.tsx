import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import MainStack from './MainStack';
import AuthStack from './AuthStack';

const AppNavigator = () => {
    const auth = useContext(AuthContext);

    return(
        <NavigationContainer>
            {auth?.isAuth ? <MainStack/> : <AuthStack/>}
        </NavigationContainer>
    );
};

export default AppNavigator;
