const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../models/user.models");
var jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

userRouter.post("/register", async (req, res) => {
  const {email,pass,location,age}=req.body;
  try {
    const user = await UserModel.findOne({email});
    if(user){
      res.send("User already exists")
    }

    bcrypt.hash(pass, 4, async(err, hash)=> {
      // Store hash in your password DB.
      const user = new UserModel({email,pass:hash,location,age});
      await user.save();
      res.status(200).send({ msg: "User register successful" });
    
  });

  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  console.log(email, pass);
  try {
    const user=await UserModel.findOne({email});
    if(user){
      bcrypt.compare(pass, user.pass, (err, result)=> {
       if(result){
        res.status(200).send({"msg":"Login Successful","token":jwt.sign({ userId: user._id }, "masai")})
       }else{
        res.status(400).send({"msg":"Wrong Crendential"})
      }
    })
    }else{
      res.status(400).send({"msg":"No user found"})
    }
      
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

userRouter.get("/details", async (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      res.status(400).json("invalid token");
    } else if (decoded) {
      res.status(200).send({ msg: "Movie details are here" });
    }
  });
});

module.exports = { userRouter };
