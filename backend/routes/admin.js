var express = require('express');
var router = express.Router();
const userModel = require('../models/users.model');

router.use(express.json());

const cors = require('cors');

router.use(cors());

let login = true;

router.get('/', (req, res) => {
    let form = `<form action="admin/login" method="post">
    <h2>Lägg till ny bok</h2>
    <div>
    Namn: 
    <input type="text" name="bookName">
    </div>
    <div>
    Författare: 
    <input type="text" name="author">
    </div>
    <div>
    Sidor: 
    <input type="text" name="pages">
    </div>
    <div>
    <button type="submit">Spara</button>
    </div>
</form>`
res.send(form);

  });

  router.post("/login", function (req, res) {

    console.log(req.body);
    res.send("hej");

        });


  router.get('/hej', async (req, res) => {
      if (login){
        const users = await userModel.find();
        var theUsers = "<div>";
    
        for(var i = 0; i< users.length; i++){
             theUsers += '<p>' + users[i] + "</p>";  
         }
         theUsers += '</div>';
    
         res.send(theUsers);
      }
      else{
          res.send("nrj")
      }
  })
  
  module.exports = router;