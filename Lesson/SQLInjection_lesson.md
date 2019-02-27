# SQL Injection - CWE: 89

## Basics of SQL

SQL stands for Structured Query Language and SQL is used with databases. Database management systems work by allowing users to create, retrieve, and modify data. There are a variety of queries, but the most basic is SELECT < data > FROM < table > WHERE < condition is met >.

Select queries return the selected data from a specific table when the condition is met.


|Name    | Surname| Username |Password   |User ID  |email           |
|:----------:|:----------:|:---------:|:---------:|:-------:|:-------------------:|
|Princess      | Carolyn      |PrCa |password101|17       | Princess_Carolyn@hollywoo.com |
|Todd      | Chavez      | ToCh |angelW0rd  |221      | Todd_Chavez@hollywoo.com |
|Sarah      | Lynn      | SaLy |pumpkin314  |712      | Sarah_Lynn@hollywoo.com |
|Diane      | Nguyen      | DiNg |bo0kworm  |319      | Diane_Nguyen@hollywoo.com |
|Wanda      | Pierce      | WaPi |phoeb3  |81      | Wanda_Pierce@hollywoo.com |
|Vincent      | Adultman      | ViAd |3kiat  |63      | Vincent_Adultman@hollywoo.com |


***ask a question about what info is returned in a given select query***

[Injection Attacks](https://raysarivera.github.io/Honors_proj1/Lesson/SQLInjection_lesson1)

