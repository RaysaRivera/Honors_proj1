# SQL Injection - CWE: 89

## Basics of SQL

SQL stands for Structured Query Language and SQL is used with databases. Database management systems work by allowing users to create, retrieve, and modify data. There are a variety of queries, but the most basic is SELECT <data> FROM <table> WHERE <condition is met>.
Select queries return the selected data from a specific table when the condition is met.

***Add an example table & ask a question about what info is returned in a given select query***

## Injection attacks

As defined by ibm.com, an injection attack allows "an attacker to inject code into a program or query or inject malware onto a computer in order to execute remote commands that can read or modify a database, or change data on a web site."

A SQL Injection attack is when an attacker alters SQL commands that use an input that is directly included as part of the query by having a command terminate early and/or adding their own command into the pre-existing query. The largest problem with SQL Injection attacks is that a SQL query is a rich tree structure, but is being treated as a string.

Generally, attackers use this attack to gather privileged information from the database, to modify data, or to execute their own operating system commands. 

***Ask a conceptual question about injection attacks***

## Example of an attack in PHP:

Users 

|Username    |Password   |User ID  |
|:----------:|:---------:|:-------:|
|Auggie      |password101|17       |
|Naveah      |angelW0rd  |221      |

***Add a larger table of info & use it for this example & the one from above***

### SQL Query
```
$sql_command = "select * from users where username = '" . $_POST['username'];   
$sql_command .= "' AND password = '" . $_POST['password'] . "'";  
```

SELECT * FROM users WHERE username='<username>' AND password='<password>'
    
. $_POST['username'];  is used to have the user submit the information inside the brackets
    
### Command that could be used to exploit the attack
Before entering the password portion, a malicious user could enter a “<userid> OR 1=1; --”
SELECT * FROM users WHERE username='<username>' OR 1=1; -- ' AND password='<password>'

The addition of “1 = 1;--” can make it so that the entire SQL query is a tautology and as a consequence, a user can retrieve the all of sensitive information from the database that should have only been visible for those with proper access.

The expected results after entering the proper credentials for Auggie:

|Username    |Password   |User ID  |
|:----------:|:---------:|:-------:|
|Auggie      |password101|17       |


The results after the malicious command are:
    
|Username    |Password   |User ID  |
|:----------:|:---------:|:-------:|
|Auggie      |password101|17       |
|Naveah      |angelW0rd  |221      |

***Add a question of similiar malicious queries and ask which is another malicious query***

## How to prevent the attack: 
Ensuring that there isn’t a user controllable input that is used directly in a SQL query can prevent injection attacks. You can do this through sanitizing the input, treating all input as a parameter, using regular expression to identify harmful code patterns and making sure that only necessary accounts have access to the database. 

## Code of a proper solution: 
```
$con=mysqli_connect("localhost","user","password","db");  
$username = mysqli_real_escape_string($con, $_POST['username']);  
$password = mysqli_real_escape_string($con, $_POST['password']);  
$sql_command = "select * from users where username = '" . $username; $sql_command .= "' AND password = '" . $password . "'";  
```