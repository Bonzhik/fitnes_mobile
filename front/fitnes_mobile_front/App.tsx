import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigations/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <AppNavigator/>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default App;
