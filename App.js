import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { setStatusBarHidden } from 'expo-status-bar';

export default function App() {

  const [estado, setarEstado] = useState('leitura');
  const [anotacao, setarAnotacao] = useState('');

  useEffect(()=> {
    (async()=> {
      try{
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
        setarAnotacao(anotacaoLeitura);
      }catch(error){

      }
    })();
  }, []);


  let setarData = async() => {
    try{
      await AsyncStorage.setItem('anotacao', anotacao);
    }catch(error){

    }
  }

  function atualizarTexto(){
    setarEstado('leitura');
    setarData();
  }


  if(estado === 'leitura'){
    return(
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.anotacao}>Minhas anotações</Text>
        </View>
        {
          (anotacao !== '') ?
        <View>
          <Text style={styles.textBody}>{anotacao}</Text>
        </View>
        :
        <View>
          <Text style={styles.textBody}>Nenhuma anotação encontrada :(</Text>
        </View>
        }

        
        <TouchableOpacity style={styles.btnAnotation} onPress={()=> setarEstado('atualizando')}>
        {
          (anotacao === '') ?
          <Text style={styles.btnAnotationTxt}>+</Text>
          :
          <Text style={styles.btnSalvarTxt}>Editar</Text>
        }
        </TouchableOpacity>
        
      </View>
    );
  }else if(estado === 'atualizando'){
    return(
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.anotacao}>Minhas anotações</Text>
        </View>
        <View>
          <TextInput onChangeText={(text)=>setarAnotacao(text)} style={styles.textBody} multiline={true} 
          numberOfLines={2} autoFocus={true} value={anotacao}></TextInput>
        </View>
        <TouchableOpacity style={styles.btnSalvar} onPress={()=> atualizarTexto()}>
          <Text style={styles.btnSalvarTxt}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  }



}


const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 35,
    backgroundColor: '#1f2326'
  },
  anotacao: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center'
  },
  btnAnotation: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    backgroundColor: '#1f2326',
    borderRadius: 50
  },
  btnAnotationTxt: {
    color: 'white',
    position: 'relative',
    textAlign: 'center',
    top: 5,
    fontSize: 30
  },
  btnSalvar: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 100,
    paddingTop: 0,
    paddingBottom: 10,
    backgroundColor: '#1f2326'
  },
  btnSalvarTxt:{
    fontSize: 20,
    color: 'white',
    position: 'relative',
    textAlign: 'center',
    top: 3,
    padding: 5
  },
  textBody: {
    padding: 10,
    fontSize: 20
  }
});