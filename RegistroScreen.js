import * as React from 'react';
import { useState, useContext } from 'react';
import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from './components/styles';

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';
//colors
const { darkLight, brand, primary } = Colors;

import { Text, View, StyleSheet,
  SafeAreaView, TextInput,
  Button, Alert
  
} from 'react-native';

import DatePicker from 'react-native-datepicker';
//import DatePicker from 'react-native-date-picker';

// Datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';


import { getDbConnection, insertTask } from '../db';

export default function RegistroScreen ()  {

    const [name, onChangeText] = React.useState('');
    const [dni, onChangeNumberDni] = React.useState('');
    const [asiento, onChangeNumberAsiento] = React.useState('');
  
    state ={
      data:''
    };

    ChangeDate = (valor) => {
      this.setState({
        data: valor
      })
    };


    async function createTask(){
        if(name == ''||dni == ''||asiento == ''){
            setError('No deje espacios en blanco');
            return;
        }
        try{
            const db = await getDbConnection();
            await insertTask(db,name,dni,asiento);
            

            db.close();
        }catch (e){
            setError(`Error:${e.message}`);
        }
    }
    return (
        
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <Text >INGRESO DE DATOS DEL PASAJERO</Text>

      

          <SafeAreaView>

            <TextInput
              style={styles.input}
              onChangeText={onChangeText} 
              value={name}
              placeholder="Nombre"
            />
            
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumberDni}
              value={dni}
              placeholder="DNI"
              keyboardType="numeric"
            />
            
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumberAsiento}
              value={asiento}
              placeholder="Numero de Asiento"
              keyboardType="numeric"
            />
            {show && (
                <DatePicker
                  formt="DD/MM/YYYY"
                  style ={styles.dateComponente}
                  date={this.state.data}
                  onDateChange={this.ChangeDate}
                />
              )}
          
            <Button
              title="Registrar"
              color="#f194ff"
              onPress={createTask}
            />
            
          </SafeAreaView>
      </View>
    );
  }
  const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 200,
      margin: 15,
      borderWidth: 1,
      padding: 10,
    },
    
    dateComponente:{
      margin: 15,
      borderWidth: 1,
      width: 200
    },
  
  });
