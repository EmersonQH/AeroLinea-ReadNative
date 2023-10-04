import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

enablePromise(true);

const DATABASE_NAME = 'task.db'//Nombre de la Base de Datos

//funcion para la conexion de la base de datos
export async function getDbConnection(){
    const db = await openDatabase ({name: DATABASE_NAME, location: 'default'});//uso de la funcion de la library react
    return db;
}

//Funcion de creacion de tabla o Consulta
export async function createTables(db){
    const query =
    'CREATE TABLE IF NOT EXISTS task(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(512), dni INTEGER, asiento INTEGER)';
    return db.executeSql(query,[]);
}

//Funcion de obtencion la conexion y creacion de la tablas
export async function initDatabase(){
    const db = await getDbConnection();//Se realiza conexion
    await createTables(db); //Crea las tablas
    db.close();//Cerrar la conexion
}

//Consulta a la base de datos
export async function insertTask(db,name,dni,asiento){
    const inserQuery = `INSERT INTO task (nombre, dni, asiento) values ('${name}','${dni}','${asiento}')`;
    const result = await db.executeSql(inserQuery);
    return result;
}
//Para realizar tareas
export async function gestTask(db){
    const tasks = [];
    const results = await db.executeSql('SELECT id,nombre,dni,asiento FROM task');
    results.forEach(function (resultSet){
        for(let index = 0; index < resultSet.rows.length; index ++){
            tasks.push(resultSet.rows.item(index));
        }
    });
    return tasks;
}



