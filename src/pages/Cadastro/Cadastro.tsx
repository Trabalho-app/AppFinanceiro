import React, { useState } from 'react';
import {
    Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FullScreenLoader from '../../Components/Loading';
import { createData, readData } from '../../firebase/firebase-crud';

const Cadastro = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [Loading, setLoading] = useState(false);

  const submitForm = () => {
    if(username.length === 0 || password.length === 0 || confirmPassword.length === 0){
        Alert.alert('Preencha todos os campos');
        return;
    }

    if (password !== confirmPassword){
        Alert.alert('Senhas não conferem');
        return;
    }

    setLoading(true);

    readData('Users/' + username).then(async (data) => {
        if(data){
            Alert.alert('Usuário já cadastrado');
            setLoading(false);
            return;
        }

        await createData('Users/' + username, {
            username, password,
        });

        Alert.alert('Usuário cadastrado com sucesso');
        setLoading(false);

        navigation.navigate('Login');
    });
    return;

  };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Cadastre-se</Text>
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
        <TextInput
          style={styles.inputs}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {
            confirmPassword.length > 0 &&
            password !== confirmPassword &&
            <Text style={styles.textDanger}>Senhas não conferem</Text>
        }
        {
            confirmPassword.length > 0 &&
            password === confirmPassword &&
            <Text style={styles.textSuccess}>Senhas são iguais</Text>
        }
        <TouchableOpacity
          style={styles.button}
          onPress={submitForm}
        >
          <Text style={styles.textButton}>Fazer Cadastro</Text>
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
    textSuccess: {
        color: 'green',
    },
    textDanger: {
        color: 'red',
    },
  });

export default Cadastro;
