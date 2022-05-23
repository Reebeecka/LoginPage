# NewsLetter Subscription

---
displayName: NewsLetter Subscription
description: A simple subscription client
labels: ['node.js', 'express', 'communication', 'backend' , 'frontend']
---

Two projects in one, both front-end and back-end to provide a back-end server that handles email subscriptions 
where the front-end just shows the backend at work.

Installation instructions:
This is a Node.js module available through the npm registry.

Before installing, download and install Node.js.

Start the front-end project with liveServer, no installation required. 

Start the back-end project by running the command 
npm install

and you will install:
"cors": "^2.8.5",
"express": "^4.18.1",
"mongoose": "^6.3.4",
"nodemon": "^2.0.16"
(these are all the latest versions on the time of creation)

nodemon might need to be installed globally on your computer do that by typing
npm install --global nodemon in the command line. 

Then to run the back-end project type npm start in the command line and the backend server will be started. 
If everything works then you will se 
"Application is running on port 5000" & "Database is connected" 
in your terminal


Important information about the project: 

The backend server when on your computer will be ran on localhost:5000 and to get to the admin view write 
localhost:5000/admin 
in your browser. 
You will have to login the 
username is Admin and the 
password is Admin 
dont forget the big A in both Admins. 
On that site you will see all the users that have an account in the Database.

