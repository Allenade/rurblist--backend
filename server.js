const express = require('express');
const bodyPerser=require('body-parser');
// const session = require('express-session');
const dotenv = require('dotenv');
const cors =require('cors');
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const dbConnect =require('./config/dbConnection');
const errorhandler =require('./middlewares/errorhandler');


//router paths
const Router=require('./routes/index');
const authRoutes = require('./routes/auth.route');

//load env 
dotenv.config();

//db connect
dbConnect();

const app=express();

//app use
app.use(cors());
app.use(morgan('dev'));
app.use(bodyPerser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


//router
app.use(Router);
app.use('/api/auth', authRoutes);

//error handlers
app.use(errorhandler.notfound);
app.use(errorhandler.errorHandler);



//start server
app.listen(process.env.PORT ,()=>{
    console.log(`rublist server is running on ${process.env.PORT}`)
});
