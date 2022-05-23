var express = require('express');
var router = express.Router();
const userModel = require('../models/users.model');

router.use(express.json());

//För att logga in på sidan om man redan har en användare
  router.post('/login', async (req, res) => {
    const products = await userModel.find();
    const result = products.find( ({ username }) => username === req.body.username );
    if(result){
      if(result.password === req.body.password){
        res.send(result._id);
      }
      else{
        res.send("incorrect");
      }
    }
    else{
      console.log(result);
      res.send("incorrect");
    }
  });


//Skapa ny användare
  router.post('/create', async (req, res) => {
    const user = await userModel.find();
    const result = user.find( ({ email }) => email === req.body.email );
    if(!result){
      const product = new userModel(req.body);
      await product.save();
      res.send("done");
    }
    else{
      res.send("email already exists");
    }
  });

  router.put('/change', async (req, res) => {
    const {_id, newsletter} = req.body;
    const product = await userModel.findById({_id});
    product.newsletter = newsletter;

    let text = ""

    if (product.newsletter){text = "true"}
    else{text = "false"}
  
    await product.save();
    res.send(`Newsletter subscription now ${text}`);
  });

  
  module.exports = router;