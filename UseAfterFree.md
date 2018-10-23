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

	free(malloc1); // (2)
	long *malloc2 = malloc(0); // (3) Zero allocation to confuse on purpose
	*malloc2 = (long)bad; // (4)
	malloc1->vulnfunc(); // BOOM! (1)
}
```

In the example above from [here](https://sensepost.com/blog/2017/linux-heap-exploitation-intro-series-used-and-abused-use-after-free/), a pointer is created to the "good" function, then freed. When the a second pointer is created to point to the bad function, the original pointer is called successfully, though it has been freed. That pointer points to the newly allocated pointer that points to the "bad" function, demonstrating the use-after-free vulnerability. Note that a zero allocation is used to help confuse the program as to where the memory should be allocated.

Many cases of the use after free vulnerability are very specific program bugs and will be found rarely. In addition to that difficulty, in order to use such a vulnerability to execute arbitrary code, you must have great control over memory within the heap, which is oftentimes difficult when working with complex programs. 

Most defense comes from strong memory containment by whatever language is being used. Not letting users have access to dangling pointers is the strongest way to prevent any issues. Restricting user access from dynamic pointers, as well as input validation are both ways programmer's can protect their programs as well. 

While no popular attacks have been found to use this vulnerability, browsers are often afflicted from this, leading to possible drive-by viruses from websites or XSS vulnerabilities. They are often found and fixed relatively quickly.
