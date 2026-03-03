const express = require('express');
const Route = express.Router();
const rateLimit = require('express-rate-limit');
const errorHandler=require('../middlewares/errorhandler');
const AuthController = require('../controllers/authController');
const Checker = require('../middlewares/checker');


// Rate limiter for forgot password
const forgotPasswordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window per IP
    message: {
        success: false,
        message: "Too many reset attempts. Please try again in 15 minutes"
    }
});

// Rate limiter for reset password
const resetPasswordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: "Too many attempts. Please try again later"
    }
});

// Routes with rate limiting
Route.post('/forgot-password', forgotPasswordLimiter, AuthController.forgotPassword);
Route.post('/reset-password', resetPasswordLimiter, AuthController.resetPassword);


// Create new user
Route.post('/create-user', AuthController.createUser);

// Verify OTP
Route.post('/verify-otp', AuthController.verifyOtp);

// Resend OTP
Route.post('/resend-otp', AuthController.resendOtp);

//login user
Route.post("/login", AuthController.loginUser);

// Logout user (requires authentication)
Route.post('/logout', Checker.authmiddleware, AuthController.logout);


Route.use(errorHandler.notfound);
Route.use(errorHandler.errorHandler);


module.exports = Route;

