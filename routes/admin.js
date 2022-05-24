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

    if (req.body.name == "Admin" && req.body.password == "Admin") {
        login = true;
        res.redirect("/admin/logedin");
    }
    else {
        res.send("Fel användarnamn eller lösenord");
    }
});


router.get('/logedin', async (req, res) => {
    if (login) {
        const users = await userModel.find();
        let logout = '<a href="/admin">Logga ut</a>'
        let emailList = '<a href="/admin/emailList">Se e-post lista för nyhetsbrev</a>'
        var theUsers = "<div>";

        for (var i = 0; i < users.length; i++) {

            let text = "";
            if (!users[i].newsletter) {
                text = "inte "
            }
            else { text = "" };

            let user = `<div>
             <h3>${users[i].username}</h3>
             <p>${users[i].email}</p>
             <p>Prenumererar ` + text + `på brevet</p>
             `
            theUsers += user;
        }
        theUsers += '</div>';

        res.send(logout +"</br>"+ emailList + theUsers);
    }
    else {
        res.redirect("/admin");
    }
});

router.get('/emailList', async (req, res) => {
    if (login) {
        const users = await userModel.find();
        let logout = '<a href="/admin">Logga ut</a>'
        let emailList = '<a href="/admin/logedin">Till alla användare</a>'
        var theUsers = "<ul>";

        for (var i = 0; i < users.length; i++) {

            let user;
            if (!users[i].newsletter) {user=""}
            else { user =  `<li>${users[i].email},</li>`};

            theUsers += user;
        }
        theUsers += '</ul>';

        res.send(logout +"</br>"+ emailList + theUsers);
    }
    else {
        res.redirect("/admin");
    }
})
module.exports = router;