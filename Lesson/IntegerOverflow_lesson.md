# Integer Overflow

Integer overflow, as a vulnerability, is the usage of the programming concept of integer overflow in a malicious way. Oftentimes, this vulnerability is used to make a program act in an unexpected way, leading to loss or overwriting of data. 
The programming concept of integer overflow is a side effect of definite sizing of numbers, and how these numbers are increased. All digital data is stored as a set of binary numbers, and the size of these sets need to be predictably defined in order for them to be used effectively. Integers, for example, will be kept in a size of binary numbers appropriate for the size of the integer. An int in C uses 16 bits to store the number, meaning those bits will be read as a number between -32,768 to 32,767. When you increase this integer by one, a binary one will be added to it. If one is added to an int holding the value of 32,767, a binary one is added, causing these bits to then hold a value that will be read as -32,768, though the programmer may think this int will contain 32,767 + 1. 

A typical integer overflow attack will involve making a integer value that is expected to be positive overflow to a negative value, causing the program to behave in an unexpected way, allowing for the attacker to gain access to data they shouldn't. 

Below is an example of a vulnerable function from [this](http://projects.webappsec.org/w/page/13246946/Integer%20Overflows) website:

```C
void bad_function(char *input) {
	char dest_buffer[32];
	char input_len = strlen(input);
 
	if (input_len < 32) {
		strcpy(dest_buffer, input);
		printf("The first command line argument is %s.\n", dest_buffer);
	} else {
		printf("Error – input is too long for buffer.\n");
     	}
}
```

In this function, it takes in a character string from stdin and passes it to the function. It then checks to see if the character string is too long (to prevent a buffer overflow attack). Though if the character array is so long, the strlen function will return a number larger than the standard integer size, causing an integer overflow so that the value of input_len is now negative. This passes the if statement, and writing to the destination buffer. This would mean that a buffer overflow attack is now viable to inject malicious code into the system. 

Another common cause of this vulnerability is using data types that are not suitable for the functions they are for. If a number has the ability to go beyond the range of the data type, a larger data type must be used to prevent issues in both program performance as well as weak security. Casting and assignments must be reviewed to ensure overflows cannot happen. 

To prevent these types of vulnerabilities, programmers must ensure that they expect a user to be malicious, and take steps to stop such an attack. From the function above, the easiest way to fix this vulnerability would be to also check that input_len is not negative, preventing the overflow issue. Variable data types must be properly used to ensure all possible values can be contained within that one data type.

[Stagefright](https://en.wikipedia.org/wiki/Stagefright_%28bug%29) is a series of bugs in the Android operating system that have caused serious issues in the past, while continually reemerging with new updates of the OS. Named after the library it takes advantage of, Stagefright uses the series of calculations necessary for sending messages containing mp4 files to cause an integer overflow, which will allow for a heap overflow and privilege escalation to gain full access to the system. Sending a specifically made message containing an mp4 file to a phone number will give access to the attacker with no end-user actions needed to finish the attack. Google has released patches for the bugs, though Stagefright shows that there are still vulnerabilities buried in the complex operating systems of today, waiting to be found. 

A demo of this vulnerability can be found on the [YouTube channel of the security firm that discovered the bugs](https://www.youtube.com/watch?time_continue=1&v=PxQc5gOHnKs).

[Test your knowledge](https://raysarivera.github.io/Honors_proj1/Lesson/IntegerOverflow_quiz)
