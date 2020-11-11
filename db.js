const mysql =require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'task',
  database: 'formdata',
  password: 'task'
});


function getAlluser(){

    return new Promise(function(resolve,reject){
        connection.query(
            `select * from user`,
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


exports=module.exports={
    getAlluser,
    adduser
}