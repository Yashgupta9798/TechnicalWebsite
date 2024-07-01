//a file which is for the admin checker

const adminMiddleware = async (req, res, next)=>{
    try {
        // console.log(req.user);---->this is due to the context api>> auth middleware>>we can access in any page
        const adminRole = req.user.isAdmin;
        // res.status(200).json({msg: req.user.isAdmin});
        if(!adminRole){
            res.status(403).json({message:"Access denied. User is not an admin."});
        }
        next();
    } catch (error) {
        next(error);
    }

}

module.exports = adminMiddleware;