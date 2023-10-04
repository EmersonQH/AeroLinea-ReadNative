import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import TaskItem from '../TaskItem';
import {getDbConnection, gestTask } from '../db';

function renderTaskItem({item}) {
  return <TaskItem task={item} />;
}

export default function InfoScreen() {

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function fetchDb() {
        const db = await getDbConnection();
        const taskFromDatabase = await gestTask(db);
        setTasks(taskFromDatabase);    
    }
    fetchDb();
  }, []);
  return (
    <FlatList 
    data={tasks} 
    renderItem={renderTaskItem} 
    keyExtractor={(item) => item.id} /> 
  );
}
