var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");
const userModel = require('../models/users.model');

router.use(express.json());

const cors = require('cors');

router.use(cors());

router.get('/login/:id', async (req, res) => {
  const life = await userModel.findById({_id: req.params.id});
  res.status(200).json(life)
});

//För att logga in på sidan om man redan har en användare
  router.post('/login', async (req, res) => {
    const users = await userModel.find();
    const result = users.find( ({ username }) => username === req.body.username );
    if(result){
      var originalPassword = CryptoJS.AES.decrypt(result.password, "theKey").toString(CryptoJS.enc.Utf8);
      if(originalPassword === req.body.password){
        res.json(result._id);
      }
      else{
        res.json("incorrect");
      }
    }
    else{
      res.json("incorrect");
    }
  });

  
//Skapa ny användare
  router.post('/create', async (req, res) => {
    const user = await userModel.find();
    const resultEmail = user.find( ({ email }) => email === req.body.email );
    const resultUserName = user.find( ({ username }) => username === req.body.username);
    if(!resultEmail){
      if(!resultUserName){
      var cryptedPassword = CryptoJS.AES.encrypt(req.body.password, "theKey").toString();
      const theUser = new userModel({username:req.body.username, password:cryptedPassword, email:req.body.email, newsletter:req.body.newsletter});
      await theUser.save();
      res.status(200).json("Created")
      }
      else{
        res.status(404).json("Username already exists")
      }
    }
    else{
      res.status(404).json("Email already exists")
    }
  });

  router.put('/change', async (req, res) => {
    const {_id, newsletter} = req.body;
    const user = await userModel.findById({_id});
    user.newsletter = newsletter;

  
    await user.save();
    res.json(user);
  });

  
  module.exports = router;