const express = require('express');
const mysql      = require('mysql');
const axios = require('axios');

const config = require('dotenv').config();


const conf = {
  host: config.parsed.DB_HOST,
  user: config.parsed.DB_USER,
  database: config.parsed.DB_BASE,
  password: config.parsed.DB_PASS,
  port: config.parsed.DB_PORT
}

const checkorder = async () => {

  const connection = mysql.createConnection(conf);

  connection.query('SELECT * FROM orders WHERE iiko_id is NULL and need_send_to_iiko=TRUE', async (err, rows, fields) =>  {
    if (err) throw err;


    for (let i = 0; i < rows.length; i += 1) {
      console.log('Строка: ', i, rows[i]);

      const orderId = rows[i].id
      await axios.post(`${process.env.API_LINK}/api/iiko/order-send/${orderId}`)
        .then((response) => {
          // handle success
          console.log('успешно оптравили ', orderId, response);
        })
        .catch( (error) => {
          // handle error
          console.log('с отправкой проблемы id: ', orderId, error.data);
        })
    }

  });

  connection.end();
}

setInterval(()=> {
  checkorder()
}, 30000);

