const bcrypt = require('bcrypt');

const saltRounds = 10;
 
export const encodedPwd = async (password)=>{
    try{
        const hashPwd = await bcrypt.hash(password,saltRounds);
        return hashPwd;
    }
    catch(error){
        let msg = 'Encryption Failed';
        if(error instanceof Error) msg = error.message;
        throw new Error(msg);
    }
};

export const verifyPwd = async(userPwd,hashPwd) =>{
    try {
        const isMAtch = await bcrypt.compare(userPwd,hashPwd);
        if(isMAtch){
            return true;
        } else{
            return false;
        }
    } catch(error){
        console.error("Password comparison error:",error);
        let msg = "Password Comparison Error";
        if(error instanceof Error) msg = error.message;
        throw new Error(msg);
    }
};