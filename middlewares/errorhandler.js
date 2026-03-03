class errorhandler{
    static notfound(req,res,next){
        const error = new Error(`Not Found: ${req.originalUrl}`);
        error.statusCode = 404;
        next(error);
    }

    static errorHandler(err,req,res,next){
        const statuscode = res.statusCode || 500;
        const message = err.message || "Internal Server Error";
        
        // Only show stack trace in development
        const response = {
            message,
            success: false
        };
        
        if (process.env.NODE_ENV === 'development') {
            response.stack = err.stack;
        }

        res.status(statuscode).json(response);
    }
}

module.exports = errorhandler;
