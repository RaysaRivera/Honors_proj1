# SQL Injection - CWE: 89

## Injection attacks

As defined by ibm.com, an injection attack allows "an attacker to inject code into a program or query or inject malware onto a computer in order to execute remote commands that can read or modify a database, or change data on a web site."

A SQL Injection attack is when an attacker alters SQL commands that use an input that is directly included as part of the query by having a command terminate early and/or adding their own command into the pre-existing query. The largest problem with SQL Injection attacks is that a SQL query is a rich tree structure, but is being treated as a string.

Generally, attackers use this attack to gather privileged information from the database, to modify data, or to execute their own operating system commands. 

***Ask a conceptual question about injection attacks***

[Basics of SQL](https://raysarivera.github.io/Honors_proj1/Lesson/SQLInjection_lesson)
[Example of a SQL Injection](https://raysarivera.github.io/Honors_proj1/Lesson/SQLInjection_lesson2)
