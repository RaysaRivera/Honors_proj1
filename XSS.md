# Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting') CWE: 79 

In general, Improper Neutralization of Input During Web Page Generation (XSS) vulnerabilities  occurs when a software doesn’t properly validate, filter, or encode user input data before placing it in an output form in a web page. This leads to attackers being able to inject their own code into the browser by using a vulnerable web page. Once the code has been injected, attackers can send malicious requests to the website on behalf of unsuspecting victims or trojan horses and other malicious software can be installed. Alternatively, attacks can obtain information that should be private from the victim’s machine through the use of the web site. Both of those scenarios are possible since XSS scripts obtain the same access rights as the victim.

### Types of XSS:
Reflected XSS (aka non-persistent XSS): This version of cross-site scripting is when an application reads input data from an HTTP request and then it gets reflected back as an HTTP response. The attack is never stored in the application and can only be found through a specific link to it. Reflected attacks are can be delivered through emails or other webpages where users get tricked into going on a malicious site/link, the injected code reflects the attack from the vulnerable website to the user’s browser. The user’s browser executes the code since it looks like it came from a safe and trusted server.

Stored XSS(aka persistent XSS): This version of cross-site scripting is when an application reads input data from an HTTP request and then stores it into a database, logs, or other component of the web page. The malicious code can be executed once the user visits a vulnerable page. 

DOM-Based XSS: In contrast to the other forms of XSS, DOM-Based XSS is an error within the DOM model in the browser of the user. In this situation, the client script performs the injection of XSS into the web page (rather than the server injecting it) and it is injected during runtime in the client directly so that the client side code runs unexpectedly despite the HTTP response remaining the same. According to Netsparker.com, up to 50% of websites are vulnerable to this threat and have found examples of such on sites as large as Yahoo, Alexa and Google.


## Example of an attack :

DOM-Based example (based on the one from Netsparker):
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
Input should be validated always and as strictly as possible. In other words, never insert unvalidated input directly into scripts, CSS, tag names, attribute names, HTML comments, HTML pages or inside javascript events. Furthermore, any character that can misinterpreted as HTML should be revised so that < is replaced with &lt; and “ with &quot; and so on and so forth. 

|Character   |Replacement|
|:----------:|:---------:|
|<           |`&lt;`       |
|>           |`&gt;`       |
|"           |`&quot;`     |
|'           |`&#x27;`     |
|&           |`&amp;`      |
|/           |`&#x2F;`     |

For DOM based XSS attacks, adding server side filters won't stop the attack since it is run on the client side. Specifically, things written after the "#"(hash) isn't sent to the server. Similarly, web application firewalls and regular framework protections also won't protect against DOM based XSS attacks. 

To best prevent DOM based XSS attacks, never use user-controlled input directly into the surce code. Also, when using user input inside < div > elements, use innerText/textContent rather then innerHTML since innerHTML inserts HTML into the code directly whereas innnerText/textContent doesn't allow the insertion of HTML tags.

## Code of a proper solution: 
 
DOM-Based example:
```
<b>Current URL:</b> <span id="contentholder"></span>

<script>
document.getElementById("contentholder").textContent = document.baseURI;    
</script>
```
## Real World Example of the attack:
This type of attack is extremely common due to the large availability of web pages, sites and interfaces that interact with them. 
Any software that uses HTML is at risk for cross-site scripting attacks and users are completely reliant on the security procedures of the websites they visit to ensure their online safety against this attack. 


The most notable example of Cross-site scripting was “the Samy worm” in 2005. The worm used XSS hidden within JavaScript code to infect and propagate. In less than 24 hours, the worm had spread over one million MySpace profiles, which was the most popular social networking platform at the time. The problem became so widespread that Myspace had to shutdown to prevent further infection. According to Anand, the director of security at Myspace shortly after the incident, the company was ill prepared for the Samy worm and barely had a security team. Anand goes on to state that it was a "watershed moment for the industry”. Jeremiah Grossman, a web security expert and founder of the firm WhiteHat Security, goes further and has said that security professionals knew about the vulnerability but didn’t take it seriously since there was no idea of how bad an attack and infection could become and that it “changed the industry forever."

The widespread issue of XSS attacks became popularized through the Samy Worm and The Open Web Application Security Project set out to create an API without becoming vulnerable to the XSS (the initiative was called “the AntiSamy Project”). Since the Samy Worm, websites and browsers have come to adapt themselves and their security measures to prevent XSS attacks. 

XSS vulnerabilities should not be overlooked as they continue to be an issue. In 2013, Yahoo email accounts were hacked and in 2015, it was possible to take control of a WordPress blog with only a comment. In August of 2018, there was a XSS vulnerability publicly discovered on Cisco Unified Communications Manager. The issue stems from “insufficient validation of user-supplied input by the web-based management interface of the affected software” and the report stated that there are no workarounds to address said vulnerability. 
