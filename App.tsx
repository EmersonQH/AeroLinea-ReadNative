import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Para las ventanas
import HomeScreen from './screens/HomeScreen';
import RegistroScreen from './screens/RegistroScreen';
//import RegistroScreen from './RegistroScreen';
import InfoScreen from './screens/InfoScreen';

//Para la base de Datos
import { initDatabase } from './db';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();

export default function App() {

  useEffect(() => {
    async function init() {
      await initDatabase();
    }
    init();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Registro de Pasajero" component={RegistroScreen} />
        <Tab.Screen name="Pasajeros Registrados" component={InfoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


