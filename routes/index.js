const express = require('express');
const Route=express.Router();
const IndexController=require('../controllers/indexController');

Route.get('/',IndexController.index);
Route.get('/home',IndexController.home);


module.exports=Route;