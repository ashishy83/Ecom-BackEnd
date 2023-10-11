const jwt = require('jsonwebtoken');
const config = require('../config');


export const generateToken  = async(userId)=>{
    try{
        const payload = {
            user:userId,
        };
        const signToken = await jwt.sign(payload,config.SECRET_KEY, {expiresIn:'ih'});
        return signToken;
    } catch(error){
        console.error('Error in generating token',error);
    }
};


export const verifyToken = async(token) =>{
    try{
        const verifiedToken = jwt.verify(token,config.SECRET_KEY);
        return verifiedToken;
    }catch(error){
        console.error("Authentication Failed",error);
    }
}