# Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting') CWE: 79 

Improper Neutralization of Input During Web Page Generation (XSS) vulnerabilities occur when user input data isn't properly validated, filtered, or encoded before being placed in an output form in a web page. This leads to attackers being able to inject their own code into the browser by using a vulnerable web page. Once the code has been injected, attackers can send malicious requests to the website on behalf of unsuspecting victims or other malicious software can be installed. Alternatively, attacks can obtain information that should be private from the victim’s machine through the use of the web site. Both of those scenarios are possible since XSS scripts obtain the same access rights as the victim.

## Types of XSS:
### Reflected XSS (aka non-persistent XSS)
This version of cross-site scripting is when an application reads input data from an HTTP request and then it gets reflected back as an HTTP response. The attack is never stored in the application and can only be found through a specific link to it. Reflected attacks can be delivered through emails or other webpages where users get tricked into going on a malicious site/link, the injected code reflects the attack from the vulnerable website to the user’s browser. The user’s browser executes the code since it looks like it came from a safe and trusted server.

#### Example of an attack :

Reflected XSS attack (example from OWASP):

```
<% String sid = request.getParameter(sid"); %> 
---
	Student ID: <%= sid %>
```

The example code is a JSP code segment and it’s supposed to read in an student ID, sid, from an HTTP request and then displays the input out to the user. Since the code is only expecting alphanumeric characters, the code runs the input to display the HTTP response. The problem is that a user can enter a link that can cause malicious code to run on their computer. Generally, the user doesn’t mean to run dangerous code on their computer. This attack is most commonly done when the user has clicked on an attacker’s malicious URL and from there, the victim accidently reflects the malicious code on to their own computer. 

### Stored XSS (aka persistent XSS)
This version of cross-site scripting is when an application reads input data from an HTTP request and then stores it into a database, logs, or other component of the web page. The malicious code can be executed once the user visits a vulnerable page. 

#### Example of an attack :

Stored XSS attack (example from OWASP):
```
<%... 
	 Statement stmt = conn.createStatement();
	 ResultSet rs = stmt.executeQuery("select * from stu where id="+sid);
	 if (rs != null) {
	  rs.next(); 
	  String name = rs.getString("name");
	%>
	
	Student Name: <%= name %>
```
The JSP code is intended to query a database for an student with the given id.

This type of code is vulnerable since it looks to be a database created from user input. If the data comes from the user and isn’t properly sanitized or validated then the attack can use those fields to store malicious commands that will execute in the user’s browser. This is unfortunate because it only takes one attacker to jeopardize the information and the systems of every user that has access to the database. Furthermore, attackers aim to attack users who have elevated privileges so that when the victim runs the code, the attacker can gain access to sensitive data or perform attacks that use more privileged operations. 


### DOM-Based XSS
In contrast to the other forms of XSS, DOM-Based XSS is an error within the DOM model in the browser of the user. In this situation, the client script performs the injection of XSS into the web page (rather than the server injecting it) and it is injected during runtime in the client directly so that the client side code runs unexpectedly despite the HTTP response remaining the same. According to Netsparker.com, up to 50% of websites are vulnerable to this threat and have found examples of such on sites as large as Yahoo, Alexa and Google.

#### Example of an attack :

DOM-Based example (based from Netsparker):
Hypothetical code from a website called http://www.XSSvuln.com/DOMex.html contains the following:
```
<script>
    document.write("<b>Current URL</b> : " + document.baseURI);
</script>
```
 
To exploit the code, you can send an HTTP request such as:
 ```
 http://www.XSSvuln.com/DOMex.html#<script>alert(1)</script>
 ```
The result of the request is that since the page is writing the typed URL into the page with the document.write function, the JavaScript code will get run automatically. This is representative of a DOM based XSS attack since the page’s source code remains the same since it’s being executed in the DOM through the use of the JavaScript code.


## How to prevent the attack: 

Generally, input should be validated always and as strictly as possible. In other words, never insert unvalidated input directly into scripts, CSS, tag names, attribute names, HTML comments, HTML pages or inside javascript events. Furthermore, any character that can misinterpreted as HTML should be revised so that < is replaced with &lt; and “ with &quot; and so on and so forth. 

|Character   |Replacement|
|:----------:|:---------:|
|<           |`&lt;`       |
|>           |`&gt;`       |
|"           |`&quot;`     |
|'           |`&#x27;`     |
|&           |`&amp;`      |
|/           |`&#x2F;`     |

From a 2006 Whitehat Security paper, there is specific prevention methods for the user and the developer involved in the attack.

Users should always be weary of clicking on links sent to them through online messagers/emails especially when the links are extremely long or look like they contain code. Users should also be careful and avoid questionable websites because those are the ones that are generally vulnerable to web browser exploitations. When on questionable sites, disabling scripts such as JavaScript, Java, and Active X can help. Furthermore, some browsers offer add-ons that can help prevent XSS attacks. 

Web Application Developers should be prioritizing input validation on all user-submitted content. Input should only be accepted if it’s the expected length with the expected characters and a proper format for the data otherwise, the input should be blocked. Additionally, another layer of security is the prevention of bots sending input and so the developer can implement session tokens, CAPTCHA systems and the like. If allowing user-supplied HTML, which isn’t recommended at all, then the HTML content must be well formed, contain no references to remote content like Style sheets or javascript and has only safe tags.  

For DOM based XSS attacks, adding server side filters won't stop the attack since it is run on the client side. Specifically, things written after the "#"(hash) isn't sent to the server. Similarly, web application firewalls and regular framework protections also won't protect against DOM based XSS attacks. 

To best prevent DOM based XSS attacks, never use user-controlled input directly into the source code. Also, when using user input inside < div > elements, use innerText/textContent rather then innerHTML since innerHTML inserts HTML into the code directly whereas innnerText/textContent doesn't allow the insertion of HTML tags.

## Code of a proper solution: 
 
DOM-Based example:
```
<b>Current URL:</b> <span id="contentholder"></span>

<script>
document.getElementById("contentholder").textContent = document.baseURI;    
</script>
```


<style>
.button {
  background-color: #4895a8;
  color: white;
  padding: 15px 20px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}
.button:hover {
  background-color: #285763;
}
</style>
<form>
<input class="button" type = "button" onclick="window.location.href = 'https://raysarivera.github.io/Honors_proj1/Lesson/XSS_quiz'" value = "Test Your Knowledge Here!"> </form> 
</br>


<form id="test">
    Go to: <input type="text" name="fname"><br>
</form>
<button onclick="clicky()">Go!</button>

<script type="text/javascript">
    
    function clicky() {
      
      var str = document.getElementById("test").elements[0].value;
      window.location.assign(str);
    }
</script>
