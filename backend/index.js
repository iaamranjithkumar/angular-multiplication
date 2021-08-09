const express = require('express')
const bodyParser = require('body-parser')
const database = require('./mysql')
var cors = require('cors')
const queries = require('./queries')
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.get('/getData', async function(req, res) {
    try{
        let result = await database.query(queries.selectLastSaved)
        res.contentType('aapplication/json').send(result && result[0]? result[0]:null)  
    }catch(err){
        res.status(500).send({error:'Internal Server Error'})
    }
})
app.post('/saveData', async function (req, res) {
    try{
    let result = await database.createRecord('users',req.body)
    res.status(200).contentType('aapplication/json').send({success:result.affectedRows>0?true:false})  
    }catch(err){
        res.status(500).send({error:'Internal Server Error'})
    }
})
app.get('*',function (req, res){
    res.status(400).send({error:'Invalid'})
})
 
app.listen(3000,()=>{
    console.log('server started at port 3000')
})