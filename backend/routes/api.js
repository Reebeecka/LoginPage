var express = require('express');
var router = express.Router();
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
    const products = await userModel.find();
    const result = products.find( ({ username }) => username === req.body.username );
    if(result){
      if(result.password === req.body.password){
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
    const result = user.find( ({ email }) => email === req.body.email );
    if(!result){
      const product = new userModel(req.body);
      await product.save();
      res.status(200).json("Created")
    }
    else{
      res.status(404).json("Email already exists")
    }
  });

  router.put('/change', async (req, res) => {
    const {_id, newsletter} = req.body;
    const product = await userModel.findById({_id});
    product.newsletter = newsletter;

  
    await product.save();
    res.json(product);
  });

  
  module.exports = router;