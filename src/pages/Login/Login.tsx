import React, { useState } from 'react';
import {
    Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { readData } from '../../firebase/firebase-crud';
import FullScreenLoader from '../../Components/Loading';
import { Context } from '../../../Context';

const Login = ({ navigation }) => {
    const {setName} = React.useContext(Context);

  const [Loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const goCadastro = () => {
    navigation.navigate('Cadastro');
  };

  const fazerLogin = () => {

    if (username === '' || password === '') {
      Alert.alert('Preencha os campos de usuário e senha');
      return;
    }

    setLoading(true);
    readData('Users/' + username).then((data) => {
        setLoading(false);

        if (!data) {
            return Alert.alert('Usuário não encontrado');
        }

        const obj = data[Object.keys(data)[0]];

        if (obj.password !== password) {
            return Alert.alert('Senha incorreta');
        }

        setName(username);
        Alert.alert('Login realizado com sucesso');
        return navigation.navigate('Dashboard');
    });

  };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Fazer Login</Text>
        <TextInput
          style={styles.inputs}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
            onPress={fazerLogin}
        >
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
            onPress={goCadastro}
        >
          <Text style={styles.textButton}>Cadastre-se</Text>
        </TouchableOpacity>
        <FullScreenLoader visible={Loading} />
      </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
      paddingBottom: 20,
    },
    inputs: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: '80%',
      color: 'white',
      marginBottom: 5,
      borderRadius: 10,
      padding: 5,
    },
    button: {
      borderRadius: 25,
      backgroundColor: '#0b5ed7',
      paddingHorizontal: 20,
      paddingVertical: 8,
      textAlign: 'center',
      marginTop: 10,
    },
    textButton: {
      color: 'white',
      textAlign: 'center',
    },
  });

export default Login;
