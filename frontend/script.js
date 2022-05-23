let root = document.getElementById("root");

let inputSection = document.getElementById("input");
let postSection = document.getElementById("posts");

let inputUsername = document.createElement("input");
inputUsername.setAttribute("type", "text");

let inputPassword = document.createElement("input");
inputPassword.setAttribute("type", "password");

let inputEmail = document.createElement("input");
inputEmail.setAttribute("type", "email");

let inputYes = document.createElement("input");
inputYes.setAttribute("type", "radio");
inputYes.setAttribute("name", "news");
inputYes.setAttribute("value", true);

let inputNo = document.createElement("input");
inputNo.setAttribute("type", "radio");
inputNo.setAttribute("name", "news");
inputNo.setAttribute("value", false);


let homebutton = document.createElement("button");
homebutton.innerHTML = "Till startsida"
homebutton.addEventListener("click", onload);
root.append(homebutton);



onload();


function onload() {
    inputSection.innerHTML = "";
    postSection.innerHTML = "";
    let test = localStorage.getItem("userID");
    if (test != null) {
        loggedIn(test);
    }
    else {
        let button1 = document.createElement("button");
        button1.innerHTML = "Logga in";
        button1.addEventListener("click", loginUser);
        let button2 = document.createElement("button");
        button2.innerHTML = "Skapa användare";
        button2.addEventListener("click", createNewUser);

        postSection.append(button1, button2);
    }
}



function loginUser() {
    inputSection.innerHTML = "";
    postSection.innerHTML = "";

    let userLabel = document.createElement("label");
    userLabel.textContent = "Användarnamn: ";

    let passwordLabel = document.createElement("label");
    passwordLabel.textContent = "Lösenord: ";

    let saveBtn = document.createElement("button");
    saveBtn.innerText = "Logga in";
    saveBtn.addEventListener("click", login);

    inputSection.append(userLabel, inputUsername, passwordLabel, inputPassword, saveBtn);
}

function login() {


    let login = {
        username: inputUsername.value,
        password: inputPassword.value,
    };

    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(login)
    })
        .then(response => response.json())
        .then(data => {
            if (data != "incorrect") {
                localStorage.setItem('userID', data);
                loggedIn(data);
            }
            else {
                let p = document.createElement('p');
                p.innerHTML = "Fel användarnamn eller lösenord, gå tillbaka till startsidan och försök igen eller skapa ett nytt konto";
                postSection.append(p);
            }
        })
        .catch(err => { console.log(err) })

}

function loggedIn(id) {

    
    inputSection.innerHTML = "";
    postSection.innerHTML = "";

    fetch(`http://localhost:5000/api/login/${id}`)
        .then(response => response.json())
        .then(data => {

            let h1 = document.createElement("h1");
            h1.innerHTML = data.username;
            let h2 = document.createElement("h2");
            h2.innerHTML = data.email;

            let button = document.createElement("button");
            button.addEventListener("click", () => changeSub(data));

            if (data.newsletter) {
                button.innerHTML = "Sluta prenumerera"
            }
            else {
                button.innerHTML = "Börja prenumerera"
            }

            let logoutBtn = document.createElement("button");
            logoutBtn.innerHTML = "Logga ut"
            logoutBtn.addEventListener("click", logout)
            postSection.append(h1, h2, button, logoutBtn);
        })
        .catch(err => console.error(err))

}

function logout() {
    localStorage.removeItem('userID');
    onload();
}
function changeSub(data) {

    let login = {
        _id: data._id,
        newsletter: !data.newsletter
    };

    fetch('http://localhost:5000/api/change', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(login)
    })
        .then(response => response.json())
        .then(data => {
            loggedIn(data._id)
        })
        .catch(err => { console.log(err) })

}

function createNewUser() {

    let userLabel = document.createElement("label");
    userLabel.textContent = "Användarnamn: ";
    let passwordLabel = document.createElement("label");
    passwordLabel.textContent = "Lösenord: ";
    let emailLabel = document.createElement("label");
    emailLabel.textContent = "E-post: ";
    let yesLabel = document.createElement("label");
    yesLabel.textContent = "Ja: ";
    let NoLabel = document.createElement("label");
    NoLabel.textContent = "Nej: ";

    inputSection.innerHTML = "";
    postSection.innerHTML = "";

    let saveBtn = document.createElement("button");
    saveBtn.innerText = "Skapa Användare";
    saveBtn.addEventListener("click", createUser);

    inputSection.append(userLabel,inputUsername,passwordLabel, inputPassword, emailLabel, inputEmail, yesLabel, inputYes, NoLabel, inputNo, saveBtn);
}

function createUser() {
    const radioButtons = document.querySelectorAll('input[name="news"]');
    let selectedNews;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedNews = radioButton.value;
            break;
        }
    }

    username = inputUsername.value;
    password = inputPassword.value;
    email = inputEmail.value;

    let newUser = {
        username: username,
        password: password,
        email: email,
        newsletter: selectedNews
    };

    fetch('http://localhost:5000/api/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
    })
        .then(response => response.json())
        .then(data => {
            if (data === "Created") {
                inputSection.innerHTML = "";
                postSection.innerHTML = "";
                let p = document.createElement("p");
                p.innerHTML = "Din användare är nu skapad. Gå tillbaka till startsidan och logga in";
                postSection.appendChild(p);
            }
            else {
                postSection.innerHTML = "";
                let p = document.createElement("p");
                p.innerHTML = "Denna e-post finns redan registrerad, gå till startsidan och logga in eller använd en annan e-post adress";
                postSection.appendChild(p);
            }
        })
        .catch(err => { console.log(err) })
}