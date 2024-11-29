import React, { useState } from 'react';
import {
    Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Context } from '../../../Context';
import FullScreenLoader from '../../Components/Loading';
import { createData } from '../../firebase/firebase-crud';

const RegistroDespesa = ({navigation}) => {

    const {name} = React.useContext(Context);

    const [nome, setNome] = useState('');
    const [valor, serValor] = useState('');
    const [isDespesaCompartilhada, setIsDespesaCompartilhada] = useState(false);

    const [Loading, setLoading] = useState(false);

    const submitCadastro = async () => {
        if(nome === '' || valor === '') {
            return Alert.alert('Preencha todos os campos');
        }

        const valorNumber = parseFloat(valor);
        if(isNaN(valorNumber)) {
            return Alert.alert('Valor de número inválido');
        }

        setLoading(true);

        await createData('Despesas', {
            nome, valor: valorNumber, criador: name, publico: isDespesaCompartilhada,
        });

        navigation.navigate('Dashboard');

        setNome('');
        serValor('');

        Alert.alert('Despesa cadastrada com sucesso');

        setLoading(false);

    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Criação de Despesa</Text>
        <TextInput
          style={styles.inputs}
          placeholder="Nome da Despesa"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Valor"
          keyboardType="numeric"
          value={valor}
          onChangeText={(e)=>{
            const numericValue = e.replace(/[^0-9.]/g, '');
            if (
                numericValue.includes('.') &&
                (numericValue.split('.').length > 2 ||
                numericValue.split('.')[1].length > 2)
            ) {return;}
            serValor(numericValue);
          }}
        />

        <Text style={styles.textIsDespesaCompartilhada}>
            Sua Despesa é Compartilhada?
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            isDespesaCompartilhada ? styles.buttonSim : styles.buttonNao,
        ]}
          onPress={() => setIsDespesaCompartilhada(!isDespesaCompartilhada)}
        >
            <Text style={styles.textButton}>{isDespesaCompartilhada ? 'Sim' : 'Não'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
            onPress={submitCadastro}
        >
          <Text style={styles.textButton}>Cadastrar Despesa</Text>
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
    textIsDespesaCompartilhada: {
        color: 'white',
        marginTop: 15,
    },
    buttonSim: {
        backgroundColor: '#198754',
        marginBottom: 20,
    },
    buttonNao: {
        backgroundColor: '#dc3545',
        marginBottom: 20,
    },
  });

export default RegistroDespesa;
