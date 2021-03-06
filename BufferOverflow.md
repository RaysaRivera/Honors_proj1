A classic buffer overflow attack occurs when a buffer has a given size, but the data placed into the buffer, most likely based upon user input, is larger than the given container, allowing the data to overwrite memory not normally accessible. 

Overwriting neighboring data can be used to prevent an application from accessing necessary data, creating a DoS attack, or to inject executable code into an area of memory with execution privilege.

The following is an example of BufferOverflow code:

```C
#include <stdio.h>

int main(int argc, char **argv) {
	char buf[8]; // buffer for eight characters
	gets(buf); // read from stdio (sensitive function!)
	printf("%s\n", buf); // print out data stored in buf
	return 0; // 0 as return value
}
```

When compiling and running the above code, it will ask for user input for a string to store in an 8-character buffer. Since the way it recieves the string is unbounded, if you enter a string of longer than 8 characters, the memory following that character array will be overwritten, which could lead to a segmentation fault. In this same example, if the attacker were to know the memory layout of the system, they could overwrite the return pointer following the print statement, allowing the code to redirect anywhere the attacker would specify. This could point to a section of malicious code that would execute when a user executes the program. 

The most basic defense is to use safe input methods with defined size limits. Preventing user input from moving beyond the acceptable size of the container, either by input denial or cutting off the end of the input. In addition, dynamic memory containers and address space layout randomization will decrease the likelihood of an effective attack. Address space layout randomization is an OS behavior that will change the container address to be random within a large section of memory. This prevents an attacker from knowing what the memory layout is, hindering the possibility of code injection and memory reconnaissance.  

Compile-time defenses do exist against buffer overflow, though they are extremely difficult to implement as the amount of dynamic memory needed is not known until run-time. The best impelementations use libraries and extensions, as well as multiple comiles, though this can cause issues with 3rd-party applications, as well as unexpected side-effects. Checking stack memory for corruption after every allocation can prevent attacks as well.

Run-time defenses use virtual memory to ensure memory space is not executable, preventing some attackes, though if this is known, an attacker can work around it to get back to physical space to execute. "Guard pages" can also be created between sections of memory, which can set off alarms if data is overwritten and prevent more important memory from being affected. 

Most modern languages have input functions that either check for data size to prevent a buffer overflow, or allow for an extra argument to describe max length of input. Input from the user is abstracted from the programmer in languages like Java, so be sure to use the safe versions of those functions. For C, the safest way of getting user input is the function

```C
char *fgets(char *s, int n, FILE *stream);
```

This function will prevent inputting greater than maximum amount of characters "n", though it's still important to sanitize input before using it.  Otherwise, it is the programmer's responsibility to know of this vulnerability and ensure they check input to prevent an attack.

As a real world example, the Code Red worm (named for the flavor of Mountain Dew drank at the time of discovery) was a virus released in July of 2001 and observed just a week later, after reaching 359,000 hosts. The worm spread using a buffer overflow vulnerability in Microsoft's IIS web server application. By inputting a long string of the character 'N', executable code was injected into the operating system to infect the host with the worm. After being infected, the host was used to DDoS on certain IP's, including the White House's servers.

[More info can be found on the wiki page here.](https://en.wikipedia.org/wiki/Code_Red_(computer_worm))

[A demonstration of the worm can be seen here](https://www.youtube.com/watch?v=iu48QBJP_p0).
