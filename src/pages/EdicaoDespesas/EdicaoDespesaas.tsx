import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Context } from '../../../Context';
import { deleteData, readData, updateData } from '../../firebase/firebase-crud';
import FullScreenLoader from '../../Components/Loading';

const EdicaoDespesas = ({navigation}) => {
    const {name, despesaEdit} = React.useContext(Context);
    const [Loading, setLoading] = useState(false);

    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [isDespesaCompartilhada, setIsDespesaCompartilhada] = useState(false);

    useEffect(() => {
      readData('Despesas/' + despesaEdit).then((data) => {
        if (!data) {
          return;
        }

        setNome(data.nome);
        setValor(data.valor.toString());
        setIsDespesaCompartilhada(data.publico);

      });
    }, []);

    const excluir = async () => {
      setLoading(true);
      await deleteData('Despesas/' + despesaEdit);
      navigation.navigate('Dashboard');
      setLoading(false);
    };

    const submit = async () => {

      if(nome === '' || valor === '') {
          return Alert.alert('Preencha todos os campos');
      }

      const valorNumber = parseFloat(valor);
      if(isNaN(valorNumber)) {
          return Alert.alert('Valor de número inválido');
      }

      setLoading(true);

      await updateData('Despesas/' + despesaEdit, {
          nome, valor: valorNumber, criador: name, publico: isDespesaCompartilhada,
      });

      navigation.navigate('Dashboard');
      setLoading(false);
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Editar Despesas</Text>
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
                numericValue.split('.').length > 2 ||
                numericValue.split('.')[1].length > 2
            ) {return;}
            setValor(numericValue);
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
          style={[styles.button]}
          onPress={submit}
        >
          <Text style={styles.textButton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonDanger]}
          onPress={excluir}
        >
          <Text style={styles.textButton}>Excluir</Text>
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
    mb4: {
        marginBottom: 20,
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
    buttonDanger: {
        backgroundColor: '#dc3545',
    },
  });

export default EdicaoDespesas;
