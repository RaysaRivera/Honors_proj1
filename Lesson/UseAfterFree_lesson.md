# Use After Free

Use After Free is a memory exploit of how languages, specifically older ones, free dynamically allocated memory. Some languages will not sanitize data when freeing memory, but rather opt to simply delete the pointer to the memory itself. However, if another section of memory is allocated over the previously freed memory, this data once again becomes accessible. If this "freed" memory were then to be used for some other pointer, data could be corrupted due to the confusion of values. Attack vectors with use after free come mostly from when the "freed" data is then used for a class pointer, causing function pointers to be scattered around the heap. These function pointers can then be used to inject malicious code into the operating system.

The following is an example of a Use After Free error:

```C
#include <stdio.h>

typedef struct UAFME {
 void (*vulnfunc)();
} UAFME;

void good(){
 printf("I AM GOOD :)\n");
}

void bad(){
 printf("I AM BAD >:|\n");
}

int main(int argc, char* argv[]) {
	
	UAFME *malloc1 = malloc(sizeof(UAFME)); // (1)
	malloc1->vulnfunc = good; // (2)
	malloc1->vulnfunc(); // (3)	

	free(malloc1); // (4)
	long *malloc2 = malloc(0); // (5) Zero allocation to confuse on purpose
	*malloc2 = (long)bad; // (6)
	malloc1->vulnfunc(); // BOOM! (7)
}
```

Below is a representation of the memory for the code above (memory will be shown in a reader-friendly way). 

```C
(0)
+----------------------+ <-- bottom of heap
|      \0     \0       |
+----------------------+
|      \0     \0       |
+----------------------+

(1)
+----------------------+ <-- malloc1
|      \0     \0       |
+----------------------+ <-- bottom of heap
|      \0     \0       |
+----------------------+ 

(2)
+----------------------+ <-- malloc1
|      *vulnfunc       |
+----------------------+ <-- bottom of heap
|      \0     \0       |
+----------------------+ 

(4)
+----------------------+ <-- bottom of heap <--malloc1
|      *vulnfunc       |
+----------------------+
|      \0     \0       |
+----------------------+ 

(5)
+----------------------+ <--malloc2 <-- bottom of heap <--malloc1
|      *vulnfunc       |
+----------------------+
|      \0     \0       |
+----------------------+ 

(6)
+----------------------+ <--malloc1
|      *vulnfunc       |
+----------------------+ <--malloc2 <-- bottom of heap
|      \0     \0       |
+----------------------+ 
```

In the example above from [here](https://sensepost.com/blog/2017/linux-heap-exploitation-intro-series-used-and-abused-use-after-free/), a pointer is created to the "good" function, then freed. When a second pointer is created to point to the bad function, the original pointer is called successfully, though it has been freed. The good pointer points to the newly allocated memory that contains a pointer to the "bad" function, demonstrating the use-after-free vulnerability. Note that a zero allocation is used to help confuse the program as to where the memory should be allocated.

Many cases of the use after free vulnerability are very specific program bugs and will be found rarely. In addition to that difficulty, in order to use such a vulnerability to execute arbitrary code, you must have great control over memory within the heap, which is oftentimes difficult when working with complex programs. 

An immediate idea to defend against this vulnerability would be to overwrite data from pointers once freed, though it should be an immediate thought that this process is incredibly slow and would affect computer speeds much too strongly.

Most defense comes from strong memory containment by whatever language is being used. Not letting users have access to dangling pointers is the strongest way to prevent any issues. Restricting user access from dynamic pointers, as well as input sanitation are both ways programmer's can protect their programs as well. 

As these vulnerabilities have been increasing in recent years, research into defense and prevention have increased as well. [This paper](https://dl.acm.org/citation.cfm?id=3243826) leverages the increase in CPU parallelization of recent years to find and sanitize memory of dangling pointers. [Other research](https://www.cs.vu.nl/~giuffrida/papers/dangsan_eurosys17.pdf) has been put into checking for the vulnerability at memory usage time, which puts a special emphasis on scalability for large systems. While this research doesn't mean much to software engineers, a solution must be found and implemented at the operating system level.

The most famous and long-lasting usage of Use-After-Free was a bug found in Internet Explorer 8, 9, and 10. While most Use-After-Frees are found in internet clients and usually fixed quickly, the bug fixed in [MS14-035](https://docs.microsoft.com/en-us/security-updates/SecurityBulletins/2014/ms14-035) was found up to a year before the bug was fixed. A popular and common attack used by malicious sites to crash and possibly extract browser data can be found [here](https://www.exploit-db.com/exploits/33860/). This attack tries to access heap data that was already freed, causing the browser to crash. A good explanation of the attack can be found [here](https://www.purehacking.com/blog/lloyd-simon/an-introduction-to-use-after-free-vulnerabilities).


[Test your knowledge](https://raysarivera.github.io/Honors_proj1/Lesson/UseAfterFree_quiz)
