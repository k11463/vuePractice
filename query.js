const mysql = require('mysql');

const bcrypt = require('bcryptjs');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'k11463',
  password: '123456',
  database: 'k11463'
});

con.connect();

const insertTable = (values) => {
  return new Promise((resolve, reject) => {
    con.query(`INSERT INTO member (account, password, phone, email, name, token) VALUES ?`, [values], (err, result) => {
      if (err){
        reject(err);
      }
      resolve(result);
    })
  })
}

const login = (ac, pw) => {
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM member WHERE account = '${ac}'`, (err, result) => {
      if (err){
        reject(err);
      }
      else if (result.length == 0){
        reject('沒有此用戶');
      }
      else{
        bcrypt.compare(pw, result[0].password, (err, res) => {
          if (res){
            resolve(result);
          }
          reject('此密碼錯誤');
        })
      }
    })
  })
}

module.exports = {
  insertTable,
  login
}
