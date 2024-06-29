// this file is for middleware which will validate the zod data with the input data

const validate = (schema) => async (req,res,next) =>{
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        // res.status(400).json({msg: err});// for full error to send means whole error object
        const message = "Fill the input properly";
        const extraDetails = err.errors[0].message;
        // res.status(400).json({msg: message});  //edit--now we are sending error to the error-middleware

        const status = 422;
        const error = {
            status,
            message,
            extraDetails,
        };
        console.log(error)
        next(error);
    }
}

module.exports = validate;