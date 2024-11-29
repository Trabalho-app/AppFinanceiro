import React from 'react';

import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/pages/Login/Login';
import Cadastro from './src/pages/Cadastro/Cadastro';
import Dashboard from './src/pages/Dashboard/Dashboard';
import EdicaoDespesas from './src/pages/EdicaoDespesas/EdicaoDespesaas';
import RegistroDespesa from './src/pages/RegistroDespesas/RegistroDespesas';
import { Context } from './Context';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [name, setName] = React.useState('');
  const [despesaEdit, setDespesaEdit] = React.useState('');

  return (
    <Context.Provider value={{name, setName, despesaEdit, setDespesaEdit}}>
      <NavigationContainer theme={DarkTheme}>
        {/* <Login /> */}
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="EdicaoDespesa" component={EdicaoDespesas} />
          <Stack.Screen name="RegistroDespesa" component={RegistroDespesa} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>

  );
}

export default App;
