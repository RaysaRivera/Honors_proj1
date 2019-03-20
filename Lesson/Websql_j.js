//Test for browser compatibility
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var mydb = openDatabase("users_db", "0.1", "A Database of Users", 1024 * 1024);

    //create the info table using SQL for the database using a transaction
    mydb.transaction(function (t) {
          //t.executeSql("DROP TABLE users");
          t.executeSql("CREATE TABLE users (id INTEGER PRIMARY KEY ASC, username TEXT, password TEXT)");
          t.executeSql("INSERT INTO users (username, password) VALUES ('PrCa', 'password101')");
          t.executeSql("INSERT INTO users (username, password) VALUES ('ToCh', 'angelW0rd')");
          t.executeSql("INSERT INTO users (username, password) VALUES ('SaLy', 'pumpkin314')");
          t.executeSql("INSERT INTO users (username, password) VALUES ('DiNg', 'bo0kworm')");
          t.executeSql("INSERT INTO users (username, password) VALUES ('WaPi', 'phoeb3')");
          t.executeSql("INSERT INTO users (username, password) VALUES ('ViAd', '3kiat')");
    });

} else {
    alert("WebSQL is not supported by your browser!");
}

//function to output the list of people in the database
function updateInfoList(transaction, results) {
    //initialise the listitems variable
    var listitems = "";
    //get the info list holder ul
    var listholder = document.getElementById("infolist");

    //clear info list ul
    listholder.innerHTML = "";

    var i;
    //Iterate through the results
    for (i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);

        listholder.innerHTML += "<li>" + row.username + " - " + row.password;
    }
}

//function to get the list of people from the database
function outputInfo(){
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the info from the user in the database with a select statement, set outputInfoList as the callback function for the executeSql command
        mydb.transaction(function (t) {
          var username = document.getElementById("inusername").value;
          var password = document.getElementById("inpassword").value;
            t.executeSql("SELECT * FROM users", [], updateInfoList);
          var query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
          //  t.executeSql(query, [], updateInfoList);
          //  t.executeSql("SELECT * FROM users WHERE username = '" + username + "' OR 1 = 1", [], updateInfoList);

        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}
