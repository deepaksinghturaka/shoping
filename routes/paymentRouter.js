const express = require('express');
const payment_route= express();
 
const paymentController = require('../controllers/paymentController');

 payment_route.get('/payment', paymentController.renderProductPage);
payment_route.post('/createOrder', paymentController.createOrder);

module.exports= payment_route