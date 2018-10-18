# Unrestricted Upload of File with Dangerous Type - CWE: 434

This vulnerability occurs when a malicious user uploads/transfers dangerous files that are processed into the host environment and can be run immediately with the program that it has intercepted. Unrestricted upload of file with dangerous type presents a large risk to the system because the uploaded file could compromise the system’s safety by exploiting local vulnerabilities, inserting a phishing page or a permanent XSS into the website, obtaining sensitive data or by overwriting files/data that other users access (can replace .htaccess file so the attacker can execute specific scripts).With .asp and .php files, these are especially dangerous since web servers often automatically execute those extensions despite the file system permissions that may not specify execution.

## Example of an attack:



## How to prevent the attack: 

### File extension verification
File extension verification fails because it’s hard to determine which executables should be allowed and which should be filtered out. Furthermore, uncommon and rarely seen executable extensions can pass through common filters and still cause havoc like extensions: php3, php4, php5, shtml, phtml, and cgi. Additionally, if only allowing specific extensions, there is an IIS 6 semi-colon vulnerability that can allow users to upload and execute file with names such as test.asp;.jpg

### Content type verification
Content type verification method of verification relies on the header of the content, but since that is supplied by the user, it can be very easily manipulated. 

### Image content type verification 
Image content type verification is the safest method of verification because it generally uses functions associated with the file type to check if it is, in fact, the type of file anticipated. For example, using getimagesize() can confirm if the presumed image is actually an image. A downfall though is that there can be executable code included as part of the image and so it would pass the content verification while still being malicious.
Change the filename for all uploaded files so that no external input is ever used
Consider storing uploaded files outside of web document roots
When using input validation, allowing only alphanumeric characters help to reduce the addition of malicious extensions
Run code on lowest privilege needed for the task. Ideally do so on individual accounts created for a single task

# Code of a proper solution: 



# Real World Example of the attack:
Earlier this year, it was discovered discovered by researcher James Bercegay that “My Cloud” a popular personal cloud storage unit had this vulnerability. By exploiting this vulnerability Bercegay could replace any file on the server and gain control over the device. The code with the vulnerability appears to be left over from an earlier project called D-Link DNS-320L since there are identical vulnerabilities and misspelled function names, but this project had the vulnerabilities corrected in 2014. 
