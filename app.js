const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const mysql =require('mysql2');
const fileUpload = require('express-fileupload')
const db=require('./db');
const path = require('path')
 

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'task',
  database: 'formdata',
  password: 'task'
});


 connection.query(
    `create table if not exists user(
        id INTEGER PRIMARY KEY AUTO_INCREMENT, 
        name varchar(20), 
        email varchar(40),
        number varchar(20),
        contact varchar(20),
        address varchar(100) ,
        city varchar(20), 
        pincode varchar(10) ,
        state varchar(20), 
        country varchar(30)
    ) 
    `
 , (err,results)=>{
    if(err)
        console.log(err)
    else{
        console.log('table created')
    }
    connection.close()
 })
 
//   connection.query(
//     `create table if not exists user_document(
       
//     ) 
//     `
//  , (err,results)=>{
//     if(err)
//         console.log(err)
//     else{
//         console.log('table created')
//     }
//     connection.close()
//  })
 


app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.get('/',(req,res)=>{
       res.sendFile(__dirname+'/index.html')
})
app.post('/',(req,res)=>{
    const {name,email,number,address,city,pincode,state,country}=req.body;
     db.adduser(name,email,number,address,city,pincode,state,country)
    .then(()=>{
        res.redirect('/');
    })
    .catch((err)=>{
        res.send(err);
    })
    

})

app.listen(3000,()=>console.log('server started on port 3000'))
