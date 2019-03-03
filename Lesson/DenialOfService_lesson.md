Denial of service (DoS) is an attack on a system with a goal of slowing or completely crashing the use of resources for that system. This attack attempts to prevent other users from accessing the system, either stopping work with the system or losing possible sales due to inaccessibility. 

Most often, this attack is done by flooding the system with requests for resources, either keeping users who would usually use these resources from accessing them or crashing the system altogether. Disabling the access to the resources by other means, either by physically disconnecting the system or rerouting traffic to a different direction would also be a denial of service attack. 

Any server with open ports can accept the "ping" command from a client, used to check the time between a request from the client to server response. By flooding the server with ping commands at a rate that is greater than the server can handle, not only will usage of the server slow down, it might overload and crash as well, depending upon server setup and the amount of ping commands. This basic idea can be extended with more effieicent systems, like the "DNS amplifier attack". By routing a server request through a DNS request first, the size of the packet can be multiplied by a factor of 8, creating a more efficient DoS attack. A "reflection" attack sends requests to a server with a spoofed response address for a different server. This could not only amplify the size or amount of responses sent to the target, it also hides the attackers address from investigation.

Most DoS attacks are called distributed denial of service (DDoS) attacks. These take advantage many controlled clients to flood a single server with much more traffic than possible from a single computer. This is possible either from multiple attackers coordinating their attacks at the same time, or previously hacked systems that are able to be taken control of. The latter, called botnets, are often created by malware installed on systems, then left in hibernation until a DDoS attack is needed.

Defense against DoS attacks can be incredibly difficult to create and implement, as malicious and benign traffic can be hard to differentiate. While there are no specific defenses to DoS attacks, mitigations can be created to make the amount of requests necessary to DoS a server much larger. First, all ports and servers not necessary to access from the internet should be hidden or closed to prevent internet traffic attacks. Spoofed addresses can be prevented from accessing your server, preventing attacks from hidden origins from occurring. Filters and modified response systems can prevent primitive attacks, while upgraded servers and specific services can mitigate more advanced attacks. 

On March 5th, 2018, the largest DDoS attack ever recorded was pointed at a customer of Arbor Networks, a server and network company. This came just days after the prvious world record setter occured against code depository Github. Both attacks took advantage of a a service called Memcached, which not only does not authenticate traffic that goes through it, but also amplifies the packet size by a factor of 50,000. This led to an attack of 1.7 Tbps against Arbor and 1.5 Tbps against Github. Interestingly enough, both attacks did not create a large outage, notably due to both systems having mitigation services and techniques in place. In the Arbor Networks case, a blocked port prevented that traffic from reaching an effective target and a successful attack.

<body>
  <div id="label">How did we do? Send your input back here:</div>
  <form id="str">
    <input type="text" name="test" size="100"><br>
  </form>
  <input type="button" id="btnClick" value="Submit" onclick="CountFun()"><br>
  <div id="showCount"></div><br><br>
  <div id="test">Congratulations! You DDoS'd us!</div>
  
  <script type="text/javascript">
    document.getElementById("test").style.display = "none";
    var cnt = 0;
    function CountFun(){
      cnt=parseInt(cnt)+parseInt(1);
      var divData=document.getElementById("showCount");
      divData.innerHTML="Submitting. Please wait...";
      if (cnt > 9)
        document.getElementById("test").style.display = "block";
    }
  
  </script>
  </body>
