Buffer overread is a vulnerability in computer systems that occurs when bounds checking responsibility is given to the user rather than programmed into the system, allowing for a malicious user to read data that they shouldn't have read access to. This is different from buffer overflow, where a malicious user takes advantage of poor or no bounds checking, and overwrites data they shouldn't have write access to. 

Reading data from a system can allow a user to see code or queries that release information that makes the system vulnerable, either by giving out usernames or passwords of users or by seeing how a system infrastructure is setup. 

The following is an example of code with a buffer overread vulnerablility, taken from it's [CWE page](https://cwe.mitre.org/data/definitions/126.html). 

```C
int main(int argc, char **argv) {
    char Filename[256];
    char Pattern[32];

    /* Validate number of parameters and ensure valid content */ 
    ...

    /* copy filename parameter to variable, may cause off-by-one overflow */ 
    strncpy(Filename, argv[1], sizeof(Filename));

    /* copy pattern parameter to variable, may cause off-by-one overflow */ 
    strncpy(Pattern, argv[2], sizeof(Pattern));

    printf("Searching file: %s for the pattern: %s\n", Filename, Pattern);
    Scan_File(Filename, Pattern);
} 

strncpy does not place a null terminator at the end of the destination string, and if the programmer does not place the null terminator in themselves, a C function would not be able to tell where the end of the string is. In this case, if either buffer of Filename or Pattern are not null terminated, the function Scan_file would not be able to tell where either ends, allowing for the user to read data beyond the end of the buffers in memory. 

To defend against a buffer overread, a programmer must use strong bounds checking, as well as good coding practices, like putting a null terminator at the end of each c-string manually. In the case for the code above, the programmer would include a line after each strncpy like such:

```C

    /* copy filename parameter to variable, may cause off-by-one overflow */
    strncpy(Filename, argv[1], sizeof(Filename));
    Filename[sizeof(Filename) - 1] = '\0';

    /* copy pattern parameter to variable, may cause off-by-one overflow */
    strncpy(Pattern, argv[2], sizeof(Pattern));
    Pattern[sizeof(Pattern) - 1] = '\0';
```

These lines will always prevent a buffer overread from a function expecting a null terminator at the end of a c-string.

In 2014, a vulnerability in the popular cryptography library OpenSSL was discovered to be in 17% of secure web servers across the internet, and was introduced two years prior, meaning that millions of servers were vulnerable to buffer overreads which could lead to insecure cryptography or data. Named for the "heartbeat" property of TLS, Heartbleed took advantage of client-decided bounds checking to read data beyond the buffer given to the server. In a heartbeat, a client checks to see if a server is still ready to respond after a portion of time where no communication has occured. A client sends a message with the message size to the site, to which the server would read the meassage to the message size, and send back the same message to ensure readiness to respond a different message. If the client sent a message size larger than the message it sent, the server would send contiguous data found after the message back to the client, allowing for the client to read server data otherwise hidden. 

Following the discovery of the bug and the amount of systems at risk, a patch was released in April of 2014, though large amounts of sites are still vulnerable to a Heartbleed attack due to improper patching of systems.

To prevent a heartbleed vulnerability, OpenSSL must be updated to the latest patch, which updates to the correct implementation of the heartbeat feature, including bounds checking to prevent a buffer overread. The new code in OpenSSL is below:

```C
* Read type and payload length first */

if (1 + 2 + 16 > s->s3->relent)

return 0;

/* silently discard */

hbtype = *p++;

n2s(p, payload);

if (1 + 2 + payload + 16 > s->s3->rrec.length)

return 0;

/* silently discard per RFC 6520 sec. 4 */

pl = p;
```

The second if statement checks the bounds of the heartbeat to ensure the proper data is being sent. 

Try to change the password by only submitting a new username.

<body>
  
  <div id="label1">New username:</div>
  <form id="user">
    <input type="text" name="test1"><br>
  </form>
  <div id="label2">Length of username:</div>
  <form id="len">
    <input type="text" name="test2"><br>
  </form>
  <input type="button" id="btnClick" value="Submit" onclick="submitClick()"><br><br>
  
  <p id="demo"></p>
  
  <table id="tab">
  <tr>
    <th>Username</th>
    <th>Password</th> 
  </tr>
  <tr>
    <td>Test</td>
    <td>hunter7</td> 
  </tr>
  </table>

<script type="text/javascript">
    
    function submitClick() {
      var x = document.getElementById("user").elements[0].value;
      var y = document.getElementById("len").elements[0].value;
      var t1 = document.getElementById("tab").rows[1].cells[0];
      var t2 = document.getElementById("tab").rows[1].cells[1];
      var l = x.length - y;
      if (l > 0) {
        t1.innerHTML = x.substr(0, y);
        t2.innerHTML = x.substring(y) + t2.innerHTML.substring(l);
      } else {
        t1.innerHTML = x;
      }
    }
  </script>
</body></html>
