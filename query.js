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

const checkMember = (ac, token, pw) => {
  return new Promise((resolve, reject) => {
    if (pw != undefined){
      con.query(`SELECT * FROM member WHERE account = '${ac}' AND token = '${token}'`, (err, result) => {
        if (err){
          reject(err);
        }
        else if(result.length == 0){
          reject('沒有此用戶_有密碼');
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
    }
    else{
      con.query(`SELECT * FROM member WHERE account = '${ac}' AND token = '${token}'`, (err, result) => {
        if (err){
          reject(err);
        }
        else if(result.length == 0){
          reject('沒有此用戶');
        }
        else{
          resolve(result);
        }
      })
    }
  })
}

const chgMember = (values, index, type) => {
  var ac = values[0].account;
  var pw = values[0].password;
  return new Promise((resolve, reject) => {
    con.query(`UPDATE member SET ${type} = '${index}' WHERE account='${ac}' AND password = '${pw}'`, (err, result) => {
      if (err){
        reject(err);
      }
      resolve(result);
    })
  })
}

module.exports = {
  insertTable,
  login,
  chgMember,
  checkMember
}
