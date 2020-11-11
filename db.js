const mysql =require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'task',
  database: 'formdata',
  password: 'task'
});




function adduser(name,email,number,address,city,pincode,state,country){
    return new Promise(function(resolve,reject){
        connection.query(
            `insert into user(name,email,number,address,city,pincode,state,country) values(?,?,?,?,?,?,?,?) `,
            [name,email,number,address,city,pincode,state,country],
                
                function(err,rows){
                    if(err){
                        reject(err);
                    }
                    else
                        resolve();
                }
        )
    })
}
function addfile(adhar,pan,id){
    return new Promise(function(resolve,reject){
        connection.query(
            `insert into user_document(adhar,pan,user_id) values(?,?,?) `,
            [adhar,pan,id],
                
                function(err,rows){
                    if(err){
                        reject(err);
                    }
                    else
                        resolve();
                }
        )
    })
}
function getid(email){
    return new Promise(function(resolve,reject){
         connection.query(
    `select id from user where email='${email}'`,
    (err,row,column)=>{
        if(err)
           reject(err)
        else    
            resolve(row[0].id)
           
    }
    )
    })
   
}
function getAllpersons(){

    return new Promise(function(resolve,reject){
        connection.query(
            `select * from persons`,
            function (err, rows, cols) {
                if (err) {
                    reject(err);
                }
                else
                    resolve(rows);
            }
        )
    })
}

exports=module.exports={
    adduser,
    addfile,
    getid
}