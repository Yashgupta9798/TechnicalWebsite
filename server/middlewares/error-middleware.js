//this file is for containing all the error such that the same error can be sent to frontend

const errorMiddleware = (err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "BACKEND ERROR";
    const extraDetails = err.extraDetails || "Error from backend";

    return res.status(status).json({message, extraDetails});
};

module.exports = errorMiddleware;