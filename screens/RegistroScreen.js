import * as React from 'react';
import { useState, useContext } from 'react';
import {
  StyledInputLabel,
  StyledTextInput,
  LeftIcon,
  Colors,
} from './../components/styles';

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

    const [nombre, setNombre] = React.useState('');
    const [dni, SetNumerorDni] = React.useState('');
    const [asiento, setNumeroAsiento] = React.useState('');

    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [error, setError] = useState(null);
    
    // Actual value to be sent
    const [dob, setDob] = useState();
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate);
      setDob(currentDate);
    };
  
    const showDatePicker = () => {
      setShow('date');
    };
  
    async function createTask(){
        
      const db = await getDbConnection();
      await insertTask(db,nombre,dni,asiento);
      console.log('Valor ingresado:', db,nombre, dni, asiento);
      //db.close();
      setNombre("")
      SetNumerorDni("")
      setNumeroAsiento("")

      // Ejecuta una consulta SQL para seleccionar todos los registros de una tabla
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM task',
        [],
        (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            console.log('Dato:', row);
          }
        },
        error => {
          console.error('Error al ejecutar la consulta SQL', error);
        }
      );
      db.close();
    });

      
    };
    

    return (
        
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <Text >INGRESO DE DATOS DEL PASAJERO</Text>

          <SafeAreaView>
          {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  style={{
                    backgroundColor: 'yellow',
                  }}
                />
              )}
            
            <TextInput
              style={styles.input}
              onChangeText={setNombre} 
              value={nombre}
              placeholder="Nombre"
            />
            
            <TextInput
              style={styles.input}
              onChangeText={SetNumerorDni}
              value={dni}
              placeholder="DNI"
              keyboardType="numeric"
            />
            
            <TextInput
              style={styles.input}
              onChangeText={setNumeroAsiento}
              value={asiento}
              placeholder="Numero de Asiento"
              keyboardType="numeric"
            />

          <MyTextInput
                  label="Fecha de Viaje"
                  placeholder="YYYY - MM - DD"
                  placeholderTextColor={darkLight}
                  value={dob ? dob.toDateString() : ''}
                  editable={false}
                  isDate={true}
                  showDatePicker={showDatePicker}
          /> 
            <Button
              title="Registrar"
              color="#f194ff"
              onPress={createTask}
            />
            
          </SafeAreaView>
      </View>
    );
  }

  const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
      <View>
        <LeftIcon>
          <Octicons name={icon} size={30} color={brand} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
      </View>
    );
  };
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
