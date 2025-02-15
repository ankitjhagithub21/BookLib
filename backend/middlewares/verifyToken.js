const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) => {
    try{
        const token = req.cookies.token;
        

        if(!token){
            return res
            .status(401)
            .json({ success: false, message: "No token provided." });
        }

        const decoded = jwt.verify(token,process.env.JWT_SEC);

        if(!decoded){
            return res
            .status(401)
            .json({ success: false, message: "Unauthorized." });
        }

        req.userId = decoded.id;
        next();

    }catch(error){
        return res
        .status(500)
        .json({ success: false, message: error.message });
    }

}

module.exports = verifyToken