# Man in the middle attack                   

A man in the middle attack (MITM) is when an attacker puts themself inside of a conversation between users/applications without being detected. Generally, attackers use MITM attacks to gain secure information or to impersonate one of the parties. 
 
There are many forms of man-in-the-middle attacks. IP spoofing is one of them and it’s where an attacker fakes its IP address so that the victim unknowingly interacts with the attacker. Domain Name Server (DNS) spoofing is when a user unknowingly visits the fake website and the attacker can then take traffic from the original site or access the login credentials of the victim. HTTPS spoofing is when an attacker tricks the victim’s browser into thinking the site is secure (as normally noted by HTTPS in the URL), but the attacker redirects the traffic to an unsecure website so that the attacker can monitor the interactions and steal any valuable and available information. A similar attack is when the victim connects to an unsecure server (HTTP), the server tries to redirect to HTTPS but the attacker uses another computer and secure server so intercept between the victim’s computer and the initial server by taking control of Secure Sockets Layer (SSL) to get the victim’s information. 

## Example of an attack with Public Key Protocol:

Suppose Alice (A) wishes to communicate with Bob (B), but there is a hidden malicious user Matthew (M) trying to eavesdrop.  

If Alice sends Bob K_PA (Alice’s public key), Matt could intercept it and send Alice a falsified message that looks like it’s from Bob, but it contains Matt’s public key (K_PM). 

Alice would encrypt her message(s) with K_PM (since she thinks that the key belongs to Bob) and send the message to Bob. 

Matt can now intercept the messages and decrypt them using K_SM (M’s private/secret key). Matt can also alter Alice’s original message when sending it to Bob . 

Matt will encrypt the message to Bob with Bob’s public key (K_PB) that Matt initially intercepted when Bob was trying to send it to Alice. 

When Bob receives the encrypted message, he will think it’s from Alice. 
 
## How to prevent the attack: 

In order to prevent MITM attacks, there needs to be secure authentication, encryption protocols and tamper detection. Tamper detection is helpful for discovering if a communication has fallen victim to a MITM attack. A common way to detect tampering is to check response times and determine if here are any abnormalities and if so, there is usually a MITM. The stronger the encryption of the communication, the safer it is from unwanted person intercepting it. Similarly, Virtual Private Networks (VPNs) can be used to ensure a secure environment for sending sensitive information because if an attack gets onto the network, they will be unable to decipher network traffic. Public key pair based authentication can also help to prevent attacks so that the communication traffic is only being sent to legitimate receivers. When communicating over HTTP, HTTPS should be used as it is a more secure communication as it is encrypted and can help prevent attacks from obtaining data through sniffing. As a user, there are plugins for browsers so that HTTPS is always used. 

## Code of a proper solution: 
 
There is no definite solution, there are only prevention techniques.

When using public key protocol, you can help prevent MITM by requiring identities to be checked. With TLS (Transport Layer Security), users are authenticated through a trusted third party (a certificate authority) that verifies that the Bob received Alice’s actual public key rather than an imposter’s like Matt. Likewise, Alice can check her communications with Bob since the public key will be digitally signed by the certificate authority.

## Real World Example of the attack:

Comcast has been accused of using MITM against its customers by injecting code into pages so that the pages present banners warning against piracy as well as putting its own ads in place of the ones on the original site. 

You are visitor number <b id="demo"></b>.






<body>
	<div>What number visitor are you? The 1000th visitor wins a special prize!</div>
  	<form id="fake">
    		<input type="text" name="test" size="100"><br>
  	</form>
	<button type="button" id="myBtn" onclick="submitClick()">Check to see if you win!</button>
	<div id="result"></div>

<script type="text/javascript">
	
	document.getElementById("demo").innerHTML = Math.floor((Math.random() * 1000) + 1);;
    	function submitClick() {
      		var num = document.getElementById("fake").elements[0].value;
          	var str = document.getElementById("result");
      		if (num == 1000) {
			str.innerHTML = "Congratulations! You won!"
      		} else {
        		str.innerHTML = "I'm sorry, you are not the 1000th visitor."
      		}
    	}
</script>
</body>

