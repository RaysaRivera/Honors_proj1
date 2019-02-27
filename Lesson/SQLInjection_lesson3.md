# SQL Injection - CWE: 89

## How to prevent the attack: 
Ensuring that there isn’t a user controllable input that is used directly in a SQL query can prevent injection attacks. You can do this through sanitizing the input, treating all input as a parameter, using regular expression to identify harmful code patterns and making sure that only necessary accounts have access to the database. 

## Code of a proper solution: 
```
$con=mysqli_connect("localhost","user","password","db");  
$username = mysqli_real_escape_string($con, $_POST['username']);  
$password = mysqli_real_escape_string($con, $_POST['password']);  
$sql_command = "select * from users where username = '" . $username; $sql_command .= "' AND password = '" . $password . "'";  
```
