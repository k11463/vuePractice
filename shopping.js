const mysql = require('mysql');
const express = require('express');
const bodyParse = require('body-parser');
const fallback = require('express-history-api-fallback');

var md5 = require('md5');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var {insertTable, login} = require('./query.js');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var webpackconfig = require('./webpack.config.js');

var app = express();

var compiler = webpack(webpackconfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackconfig.output.publicPath,
  noInfo: true,
  stats: {
    colors: true
  }
}));

app.use(webpackHotMiddleware(compiler));

var con = mysql.createConnection({
  host: 'localhost',
  user: 'k11463',
  password: '123456',
  database: 'k11463'
});

app.use(bodyParse.json());
app.use(express.static(__dirname));

con.connect();

// app.get('/getdata', (req, res) => {
//   var data = req.body;
//   console.log(data);
//   // con.query(`SELECT * FROM member`, (err, result) => {
//   //   if (err){
//   //     res.status(404).send(err);
//   //   }
//   //   res.send(result);
//   // });
// });

var brianHash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err){
          reject(err);
        }
        resolve(hash);
      })
    })
  })
};

app.post('/getData', (req, res) => {
  var data = req.body.token;
  con.query(`SELECT * FROM member WHERE token = '${data}'`, (err, result) => {
    if (err){
      res.status(404).send(err);
    }
    res.send(result);
  })
})

app.post('/loginData', (req, res) => {
  var data = req.body;
  login(data.ac, data.pw).then((result) => {
    var token = jwt.sign(result[0].account, 'brian').toString();
    res.send({res: result, token: token});
  }).catch((err) => {
    console.log(err);
    res.status(404).send(err);
  })
})

app.post('/memberRegis', (req, res) => {
  // console.log(req.body);
  var body = req.body;
  var token = jwt.sign(body.ac, 'brian');
  brianHash(body.pw).then((result) => {
    var values = [
      [body.ac, result, body.phone, body.email, body.name, token]
    ];
    return insertTable(values);
  }).then((result) => {
    res.send(result);
  }).catch((err) => {
    res.status(404).send(err);
  })
})

app.use(fallback('index.html', {root: __dirname}));

app.listen(3000, ()=> {
  console.log('start on 3000 port');
})
