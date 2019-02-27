# SQL Injection - CWE: 89

## Example of an attack in PHP:

Users 

|Name    | Surname| Username |Password   |User ID  |email           |
|:----------:|:----------:|:---------:|:---------:|:-------:|:-------------------:|
|Princess      | Carolyn      |PrCa |password101|17       | Princess_Carolyn@hollywoo.com |
|Todd      | Chavez      | ToCh |angelW0rd  |221      | Todd_Chavez@hollywoo.com |
|Sarah      | Lynn      | SaLy |pumpkin314  |712      | Sarah_Lynn@hollywoo.com |
|Diane      | Nguyen      | DiNg |bo0kworm  |319      | Diane_Nguyen@hollywoo.com |
|Wanda      | Pierce      | WaPi |phoeb3  |81      | Wanda_Pierce@hollywoo.com |
|Vincent      | Adultman      | ViAd |3kiat  |63      | Vincent_Adultman@hollywoo.com |


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

The expected results after entering the proper credentials for ToCh:

|Name    | Surname| Password   |User ID  |email           |
|:----------:|:----------:|:---------:|:-------:|:-------------------:|
|Todd      | Chavez      | ToCh |angelW0rd  |221      | Todd_Chavez@hollywoo.com |

The results after the malicious command are:
    
|Name    | Surname| Username |Password   |User ID  |email           |
|:----------:|:----------:|:---------:|:---------:|:-------:|:-------------------:|
|Princess      | Carolyn      |PrCa |password101|17       | Princess_Carolyn@hollywoo.com |
|Todd      | Chavez      | ToCh |angelW0rd  |221      | Todd_Chavez@hollywoo.com |
|Sarah      | Lynn      | SaLy |pumpkin314  |712      | Sarah_Lynn@hollywoo.com |
|Diane      | Nguyen      | DiNg |bo0kworm  |319      | Diane_Nguyen@hollywoo.com |
|Wanda      | Pierce      | WaPi |phoeb3  |81      | Wanda_Pierce@hollywoo.com |
|Vincent      | Adultman      | ViAd |3kiat  |63      | Vincent_Adultman@hollywoo.com |

***Add a question of similiar malicious queries and ask which is another malicious query***

