var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
    res.send("hej")
  });

  router.post('/', async (req, res) => {
    const user = new userModel(req.body);
    await user.save();
    res.status(201).json(user);
  });

  
  module.exports = router;