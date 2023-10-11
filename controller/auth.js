// const projmodel = require("../model/User");
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// const register = async(req,res)=>{
//    try {
//     const details = req.body;
//     await bcrypt.hash(details.password,saltRounds,(err,password)=>{
//         if(err){
//             console.log(err)
//         }
//         console.log(password)
//         res.send(password);
//     });

//    } catch (error) {
//     console.log(error)
//    }
// }

// const login = async()=>{

// }

// module.exports = {register,login};

// const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");

import User from "../model/User";
const config = require("../config");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandlers");
const encodedPwd = require("../utils/passwords");
const verifyPwd = require("../utils/passwords");

//signup
export const signUp = errorHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("sign up", name, email);
  const hashPassword = await encodedPwd(password);
  const user = new User({ name, email, password: hashPassword });
  const result = await user.save();

  const resToObj = result.toObject();
  delete resToObj.password;

  const token = jwt.sign(resToObj, config.SECRET_KEY);
  res.cookie("cookieName", "8383", { maxAge: 99999, httpOnly: true });
  res.json(resToObj);
  console.log(token);
});
//login
export const login = errorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  }).select(password);

  if (user) {
    const hashPassword = user.password;
    const isMatch = await verifyPwd(password, hashPassword);
    //if match generate a token and send it to client

    if (isMatch) {
      const result = user.toObject();
      //   const checkUser = await User.findOne({
      //     userId: result._id,
      //   });
      delete result.password;
      const token = jwt.sign({ userId: result._id }, result, config.SECRET_KEY);
      res.cookie("ecomToken", token);
      res.json({ status: "Success" }, ...result, token);
    } else {
      return res.status(404).json({ message: "User Not found" });
    }
  } else {
    return res.status(404).json({ message: "User Not found" });
  }
});

//Reset Password

export const resetPassword = errorHandler(async (req, res) => {
  const { email, password } = req.body;
  const hashPassword = await encodedPwd(password);

  const user = await User.findOneAndUpdate(
    {
      email: email.toLowerCase(),
    },
    {
      password: hashPassword,
    },
    {
      new: true,
    }
  );
  if (user) {
    res.json({ status: "Success", message: "Password changed successfully" });
  } else {
    res.json({ status: 404, message: "User not found" });
  }
});
