//Test for browser compatibility
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var mydb = openDatabase("users_db", "0.1", "A Database of Users", 1024 * 1024);

    //create the cars table using SQL for the database using a transaction
    mydb.transaction(function (t) {
          t.executeSql("DROP TABLE users");
          t.executeSql("CREATE TABLE users (id INTEGER PRIMARY KEY ASC, username TEXT, password TEXT)");
          t.executeSql("INSERT INTO users (username, password) VALUES ('PrCa', 'password101')");
          t.executeSql("INSERT INTO users (username, password) VALUES ('ToCh', 'angelW0rd')");
          t.executeSql("INSERT INTO users (username, password) VALUES ('SaLy', 'pumpkin314')");
          t.executeSql("INSERT INTO users (username, password) VALUES ('DiNg', 'bo0kworm')");
          t.executeSql("INSERT INTO users (username, password) VALUES ('WaPi', 'phoeb3')");
          t.executeSql("INSERT INTO users (username, password) VALUES ('ViAd', '3kiat	')");
    });

} else {
    alert("WebSQL is not supported by your browser!");
}

//function to output the list of cars in the database
function updateCarList(transaction, results) {
    //initialise the listitems variable
    var listitems = "";
    //get the car list holder ul
    var listholder = document.getElementById("carlist");

    //clear cars list ul
    listholder.innerHTML = "";

    var i;
    //Iterate through the results
    for (i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);

        listholder.innerHTML += "<li>" + row.username + " - " + row.password;
    }
}

//function to get the list of cars from the database
function outputCars() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
          var username = document.getElementById("inusername").value;
          var password = document.getElementById("inpassword").value;
            t.executeSql("SELECT * FROM users", [], updateCarList);
          //  t.executeSql("SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'", [], updateCarList);

        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

//function to add the car to the database
function addCar() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //get the values of the username and password text inputs
        var username = document.getElementById("inusername").value;
        var password = document.getElementById("inpassword").value;

        //Test to ensure that the user has entered both a username and password
        if (username !== "" && password !== "") {
            //Insert the user entered details into the cars table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
            mydb.transaction(function (t) {
                t.executeSql("INSERT INTO users (username, password) VALUES ('" + username + "','" + password + "')");
                outputCars();
            });
        } else {
            alert("You must enter a username and password!");
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

outputCars();
