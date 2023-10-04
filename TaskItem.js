import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#c2fff9',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15
  },
  title: {
    fontSize: 20
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 16,
    
    
  }
});

export default function TaskItem({task}) {
  const navigation = useNavigation();
  return (
    <View style={styles.item}>
      <Text style={styles.title}>Nombre    : {task.nombre}</Text>
      <Text style={styles.title}>DNI            :{task.dni}</Text>
      <Text style={styles.title}>N° Asiento: {task.asiento}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ViewTask', {taskId: task.id})}
        >
          <Text>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditTask', {taskId: task.id})}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DeleteTask', {taskId: task.id})}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}