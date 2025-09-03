

// index.js

// 1 // Import required modules
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

// Configure app to use bodyParser middleware for handling form data
app.use(bodyParser.urlencoded({extended:true}));

// Set EJS as the view engine for rendering pages
app.set("view engine", "ejs");

// Import the custom authentication module
const auth = require('./auth.js');


// Create two users for testing authentication
auth.createUser("John", "Secret123");
auth.createUser("Alice", "pass456");

// Test the authentication function
console.log(auth.authenticateUser("John", "Secret123"));
console.log(auth.authenticateUser("John", "Secret987"));




//Connect to database:
const mysql = require('mysql');
//Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proddata'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
    } else {
        console.log('Connected to database!');
    }
});
 





//Server static files from the public directory
app.use(express.static("home"));
app.use(express.static("pics"));





//route to handle the login form submission
app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const authenticated = auth.authenticateUser(username, password);
    console.log(authenticated);

    //Test for successful authentication
    if(authenticated)
    {
        console.log("Authentication was successful");
        res.render("home");
    } 
    else {
        console.log("Authentication was NOT successful");
        res.render("failed");
    }
});






app.get("/shop", function(req, res){
  const ID = req.body.rec2;
  connection.query("SELECT * FROM productdata WHERE ID = ?", [ID], function(err, rows, fields) {
    if(err){
      console.error("Error retrieving data from database:", err);
      res.status(500).send("Error retrieving data from database");
    } else if(rows.length === 0) {
      console.log(`No rows found for ID ${ID}`); 
      res.status(404).send(`No product found for ID ${ID}`);
    } else {
      console.log("Data retrieved from the Database!");
      const prodName = rows[0].Product;
      const prodModel = rows[0].Model;
      const image = rows[0].Image;
      const price = rows[0].Price;
      res.render("test.ejs", {myMessage: prodName, model: prodModel, myImage: image, myPrice: price});
    }
  });
});





console.log("This is an output from node...")
app.get("/shop",function(req,res){
    console.log("This is from a get request!");

});

app.get("/shop", function(req, res) {
    console.log("This is from a get request!");
    res.send("This is a response from the server");
})


app.get("/shop", function(req, res) {
    const ID = req.query.rec;
    let ID = 1;
    connection.query("SELECT * FROM productdata WHERE ID = ?", [ID], function(err, rows, fields)

    {
        if(err)
        {
         console.error("Error retreiving data from database:", err);
         res.status(500).send("Error retrieving data from database");
        }
        else if(rows.length === 0)
        {
         console.error("No rows found for ID $[ID]");

        }
        else
        {
            console.log("Data retrieved from the database!");
            console.log(rows[0].Product);
            console.log(rows[0].Manufacturer);
            console.log(rows[0].Model);
            console.log(rows[0].Price);
            console.log(rows[0].Image);
            const prodName = rows[0].Product;
            const prodModel = rows[0].Model;
            res.render("test.ejs", {myMessage: prodName, model:prodModel });
        }
});






// Check if authentication is successful
if (authenticated) {
    console.log("Authentication was successful!");
    res.render("home");
} else {
    console.log("Authentication was NOT successful!");
    res.render("failed");
}


app.post("/shop", function(req, res) {
    const ID = req.query.rec; // Assuming 'rec' is the query parameter for ID
    connection.query("SELECT * FROM productdata WHERE ID = ?", [ID], function(err, rows, fields) {
        if (err) {
            console.error("Error retrieving data from database:", err);
            res.status(500).send("Error retrieving data from database");
        } else if (rows.length === 0) {
            console.error("No rows found for ID ${ID}"); // Original had a typo: `ID ${ID}` should be `${ID}`
            res.status(404).send("No product found for ID ${ID}"); // Original had a typo: `ID ${ID}` should be `${ID}`
        } else {
            // Log retrieved data and render the product page with the data
            console.log("Data retrieved from the Database!");
            const prodName = rows[0].Product;
            const prodModel = rows[0].Model;
            // Assuming 'image' and 'price' were also extracted here based on previous context
            // const image = rows[0].Image;
            // const price = rows[0].Price;
            res.render("test.ejs", { myMessage: prodName, model: prodModel /*, myImage: image, myPri: price */ });
        }
    });
});





// Serve static files from the 'public' directory
app.use(express.static("home")); // This line seems unusual, typically it would be 'public' or a specific folder

app.get("/home", function(req, res) {
    res.render("home.ejs");
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log("Server started on port 3000!");
});

