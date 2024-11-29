import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Context } from '../../../Context';
import { readData } from '../../firebase/firebase-crud';

type Despesa = {
    id: string;
    nome: string;
    valor: number;
    criador: string;
    publico: boolean;
}

const Dashboard = ({navigation}) => {
    const {name, setDespesaEdit} = React.useContext(Context);

    const [tablePrivate, setTablePrivate] = useState<Despesa[]>([]);
    const [tableShared, setTableShared] = useState<Despesa[]>([]);
    const [tableAll, setTableAll] = useState<Despesa[]>([]);

    useEffect(() => {
        readData('Despesas').then((data) => {
            if (!data) {
                return;
            }

            const tablePrivate:Despesa[] = [];
            const tableShared:Despesa[] = [];
            const tableAll:Despesa[] = [];

            for(const index in data){
                const obj = data[index];
                const despesa: Despesa = {
                    id: index,
                    nome: obj.nome,
                    valor: obj.valor,
                    criador: obj.criador,
                    publico: obj.publico,
                };

                if(obj.criador === name){
                    if(obj.publico){
                        tableShared.push(despesa);
                    } else {
                        tablePrivate.push(despesa);
                    }
                }

                tableAll.push(despesa);
            }

            setTableAll(tableAll);
            setTablePrivate(tablePrivate);
            setTableShared(tableShared);
        });

    }, []);

    return (
        <ScrollView  contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.title}>Dashboard</Text>

            <View>
                <Text style={styles.title}>Bem vindo, {name}!</Text>
            </View>

            <View style={styles.viewCadastrarDespesa}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('RegistroDespesa')}
                >
                    <Text style={styles.textButton}>Cadastrar Despesa</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.drawing}>
                <Text style={styles.titleDrawing}>Minhas Despesas Privadas</Text>
                <ScrollView>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={[styles.cell, styles.header]}>ID</Text>
                        <Text style={[styles.cell, styles.header]}>Nome</Text>
                        <Text style={[styles.cell, styles.header]}>Valor</Text>
                        <Text style={[styles.cell, styles.header]}>Editar</Text>
                    </View>
                    {tablePrivate.map((item, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={styles.cell}>{item.id}</Text>
                            <Text style={styles.cell}>{item.nome}</Text>
                            <Text style={styles.cell}>R$ {item.valor}</Text>
                            <Text style={styles.cell}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        setDespesaEdit(item.id);
                                        navigation.navigate('EdicaoDespesa');
                                    }}
                                >
                                <Text style={styles.textButton}>Editar</Text>
                                </TouchableOpacity>
                            </Text>
                        </View>
                    ))}
                    {tablePrivate.length === 0 && (
                        <Text style={styles.cell}>Nenhuma despesa privada encontrada</Text>
                    )}
                </View>

                </ScrollView>
            </View>

            <View style={styles.drawing}>
                <Text style={styles.titleDrawing}>Minhas Despesas Compartilhadas</Text>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={[styles.cell, styles.header]}>ID</Text>
                        <Text style={[styles.cell, styles.header]}>Nome</Text>
                        <Text style={[styles.cell, styles.header]}>Valor</Text>
                        <Text style={[styles.cell, styles.header]}>Editar</Text>
                    </View>
                    {tableShared.map((item, index) => (
                        <View key={index} style={styles.row}>
                        <Text style={styles.cell}>{item.id}</Text>
                        <Text style={styles.cell}>{item.nome}</Text>
                        <Text style={styles.cell}>R$ {item.valor}</Text>
                        <Text style={styles.cell}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    setDespesaEdit(item.id);
                                    navigation.navigate('EdicaoDespesa');
                                }}
                            >
                            <Text style={styles.textButton}>Editar</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                    ))}
                    {tableShared.length === 0 && (
                        <Text style={styles.cell}>Nenhuma despesa compartilhada encontrada</Text>
                    )}
                </View>
            </View>

            <View style={styles.drawing}>
                <Text style={styles.titleDrawing}>Todas as Despesas</Text>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={[styles.cell, styles.header]}>ID</Text>
                        <Text style={[styles.cell, styles.header]}>Nome</Text>
                        <Text style={[styles.cell, styles.header]}>Valor</Text>
                        <Text style={[styles.cell, styles.header]}>Criador</Text>
                    </View>
                    {tableAll.map((item, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={styles.cell}>{item.id}</Text>
                            <Text style={styles.cell}>{item.nome}</Text>
                            <Text style={styles.cell}>R$ {item.valor}</Text>
                            <Text style={styles.cell}>{item.criador}</Text>
                        </View>
                    ))}
                    {tableAll.length === 0 && (
                        <Text style={styles.cell}>Nenhuma despesa encontrada</Text>
                    )}
                </View>
            </View>

        </ScrollView>
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
    drawing: {
        width: '95%',
        // height: 400,
        backgroundColor: '#161719',
        marginTop: 10,
        marginBottom: 10,
    },
    titleDrawing: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
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
    table: {
        margin: 10,
      },
      row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      cell: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
        color: 'white',
      },
      header: {
        fontWeight: 'bold',
        backgroundColor: '#f2f2f2',
        color: 'black',
      },
      viewCadastrarDespesa: {
        marginTop: 20,
      }
  });

export default Dashboard;
