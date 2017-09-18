const mysql = require('mysql');
const express = require('express');
const bodyParse = require('body-parser');
const fallback = require('express-history-api-fallback');

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
  host    : 'localhost',
  user    : 'node',
  password: 'node',
  database: 'node'
});

app.use(bodyParse.json());
app.use(express.static(__dirname));

con.connect();

app.post('/insertTable', (req, res) => {
  var body = req.body;
  con.query(`INSERT INTO ${body.tableName} (Monday, Tuesday, Wednesday, Thursday, Friday) VALUES ?`, [body.value], (err, result) => {
    if (err){
      res.status(404).send(err);
    }
    res.send(result);
  });
});

app.post('/createTable', (req, res) => {
  var tableName = req.body.tableName;
  con.query(`CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, Monday VARCHAR(255), Tuesday VARCHAR(255), Wednesday VARCHAR(255), Thursday VARCHAR(255), Friday VARCHAR(255))`, (err, result) => {
    if (err){
      res.status(404).send(err);
    }
    res.send(tableName);
  });
});

// :table :是指宣告變數 類似C++的int 或是 JS的VAR 或是PHP的$
app.get('/tableData/:table', (req, res) => {
  var table = req.params.table;
  con.query(`SELECT * FROM ${table}`, (err, result) => {
    if (err){
      res.status(404).send(err);
    }
    res.send(result);
  });
});

app.get('/findTable', (req, res) => {
  con.query(`SHOW TABLES IN node`, (err, result) => {
    if (err){
      res.status(404).send(err);
    }
    res.send(result);
  });
});

app.use(fallback('index.html', {root: __dirname}));

app.listen(3000, ()=> {
  console.log('start up port 3000');
})
