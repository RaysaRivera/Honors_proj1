# Man in the middle attack  

A man in the middle attack (MITM) is when an attacker puts themself inside of a conversation between users/applications without being detected. Generally, attackers use MITM attacks to gain secure information or to impersonate one of the parties. 
 
## Example of an attack:

There are many forms of man-in-the-middle attacks. IP spoofing is one of them and it’s where an attacker fakes its IP address so that the victim unknowingly interacts with the attacker. Domain Name Server (DNS) spoofing is when a user unknowingly visits the fake website and the attacker can then take traffic from the original site or access the login credentials of the victim. HTTPS spoofing is when an attacker tricks the victim’s browser into thinking the site is secure (as normally noted by HTTPS in the URL), but the attacker redirects the traffic to an unsecure website so that the attacker can monitor the interactions and steal any valuable and available information. A similar attack is when the victim connects to an unsecure server (HTTP), the server tries to redirect to HTTPS but the attacker uses another computer and secure server so intercept between the victim’s computer and the initial server by taking control of Secure Sockets Layer (SSL) to get the victim’s information. 
 
## How to prevent the attack: 

In order to prevent MITM attacks, there needs to be secure authentication, encryption protocols and tamper detection. Tamper detection is helpful for discovering if a communication has fallen victim to a MITM attack. A common way to detect tampering is to check response times and determine if here are any abnormalities and if so, there is usually a MITM. The stronger the encryption of the communication, the safer it is from unwanted person intercepting it. Similarly, Virtual Private Networks (VPNs) can be used to ensure a secure environment for sending sensitive information because if an attack gets onto the network, they will be unable to decipher network traffic. Public key pair based authentication can also help to prevent attacks so that the communication traffic is only being sent to legitimate receivers. When communicating over HTTP, HTTPS should be used as it is a more secure communication as it is encrypted and can help prevent attacks from obtaining data through sniffing. As a user, there are plugins for browsers so that HTTPS is always used. 

## Code of a proper solution: 
 
There is no definite solution, there are only prevention techniques.

## Real World Example of the attack:

Comcast has been accused of using MITM against its customers by injecting code into pages so that it present banners warning against piracy as well as putting its own ads in place of the ones on the original site. 
