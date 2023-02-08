// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');


// Start up an instance of app
const app = express();
// Cors for cross origin allowance
app.use(cors());
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const portNumber = 5555;
app.listen(portNumber,listening);
function listening(){
    console.log("Server is running on port "+portNumber);
}

//post route
app.post('/',function(req,res){
    console.log(req.body);
    let PostObj = {
        temperature:req.body.temperature,
        date:req.body.date,
        userResponse:req.body.userResponse,
    }
    projectData.push(PostObj) ;
    res.send('Data Saved Successfully! :) ');
    console.log(projectData);
});
//getRoute
app.get('/getData',function(req,res){
    res.send(projectData);
    console.log('get Request Successful');
})
