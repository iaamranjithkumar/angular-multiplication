const mysql = require('mysql')
const config = require('./config')
let connectionPool;

const createConnectionPool = ()=>{
    connectionPool = mysql.createPool(config.dbConnection)
}

module.exports.query = (query) =>{
    return new Promise((resolve,reject)=>{
    try{
    if(!connectionPool){
        createConnectionPool()
    }
    connectionPool.query(query,function(error, results, fields){
        if(error){
            console.log(error)
            throw 'Error while querying'
        }
        resolve(results)
    })
    }catch(err){
        reject(err)
    }
})
}

module.exports.createRecord = (tableName, data) =>{
    return new Promise((resolve,reject)=>{
    try{
        if(!connectionPool){
            createConnectionPool()
        }
        connectionPool.query(`INSERT INTO ${tableName} SET ?`,data,function(error, results, fields){
            if(error){
                console.log(error)
                throw 'Error while inserting record'
            }
            resolve(results)
        })
        }catch(err){
            reject(err)
        }
    })
}


