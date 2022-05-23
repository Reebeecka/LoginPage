var express = require('express');
var router = express.Router();
const userModel = require('../models/users.model');

router.use(express.json());
router.use(express.urlencoded());

let login = false;

router.get('/', (req, res) => {
    login = false;
    let form = `<form action="admin/login" method="post">
    <h2>Logga in</h2>
    <div>
    Användarnamn: 
    <input type="text" name="name">
    </div>
    <div>
    Lösenord: 
    <input type="password" name="password">
    </div>
    <div>
    <button type="submit">Logga in</button>
    </div>
</form>`
res.send(form);

  });

  router.post("/login", function (req, res) {

    if(req.body.name == "Admin" && req.body.password =="Admin"){
        login = true;
        res.redirect("/admin/logedin");
    }
    else{
        res.send("Fel användarnamn eller lösenord");
    }
        });


  router.get('/logedin', async (req, res) => {
      if (login){
        const users = await userModel.find();
        let logout = '<a href="/admin">Logga ut</a>'
        var theUsers = "<div>";
    
        for(var i = 0; i< users.length; i++){

            let text = "";
            if(!users[i].newsletter){
                text = "inte "
            }
            else {text = ""};
            
             let user = `<div>
             <h1>${users[i].username}</h1>
             <h2>${users[i].email}</h2>
             <h3>Prenumererar ` + text + `på brevet</h3>
             `
             theUsers += user;
         }
         theUsers += '</div>';
    
         res.send(logout + theUsers);
      }
      else{
          res.redirect("/admin");
      }
  })
  
  module.exports = router;