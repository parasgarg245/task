const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const mysql =require('mysql2');
const fileUpload = require('express-fileupload')
const db=require('./db');
const path = require('path');
const { connect } = require('http2');
const { getMaxListeners } = require('process');
 

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

 })
 
  connection.query(
    `create table if not exists user_document(
       d_id integer primary key auto_increment,
        adhar varchar(255),
        pan varchar(255),
        user_id integer,
        foreign key (user_id) references user(id)
    ) 
    `
 , (err,results)=>{
    if(err)
        console.log(err)
    else{
        console.log('user document table created')
    }
   
 })
 


app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.get('/',(req,res)=>{
       res.render('index')
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
    console.log(email)
    console.log(typeof(email))
    
    
    db.getid(email).then((id)=>{
           var file1 = req.files.adhar;
    var adhar_name=file1.name;
    
    var file2=req.files.pan;
    var pan_name=file2.name
    
    // console.log(adhar_name )
    // console.log(pan_name)
    
    uploadPath = __dirname + '/public/pdf/' + file1.name;
    uploadPath2 = __dirname + '/public/pdf/' + file2.name;
    
    
    file1.mv(uploadPath, function(err) {
        if(err)
            console.log(err)
        else
        db.addfile(adhar_name,pan_name,id);
    
    })
    
     file2.mv(uploadPath2, function(err) {
    })
    }
    )
    
   
    
 

})

app.get('/show',(req,res)=>{

  
   

    
     connection.query(
    `select name,email,number,address,city,pincode,state,country,adhar,pan from user
     inner join user_document
     on user_id=user.id
     ` ,
     (err,rows)=>{
     if(err)
        console.log(err)
      else{
        
         res.render("show", {rows:rows});
      }
     }
  )
   
})

app.listen(3000,()=>console.log('server started on port 3000'))
