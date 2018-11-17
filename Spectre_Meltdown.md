# Spectre/Meltdown : CVE-2017-5715, CVE-2017-5753, CVE-2017-5754

For meltdown, this vulnerability is a hardware based one. It stems from the use of out-of-order execution in the kernel (code that takes instructions from the OS to the CPU) to improve performance. Meltdown is able to look at the memory of the operating system’s kernel and read private data regardless of if it has the privilege to access that information. In other words, meltdown works by “melting” the barrier between user applications and the OS leaving the memory susceptible to having its secrets (from memory, programs and the OS) found out.

## Example of an attack:

## How to prevent the attack: 
According to the official meltdown attack website, it’s impossible to detect traces of the Meltdown/Spectre attack in traditional log file. Antivirus can potentially detect the attack but it’s unlikely since it’d be difficult to distinguish the attack from other types of regular applications. In order for an antivirus to detect the attack, it’d need to compare binaries after their values are known.

The Meltdown vulnerability primarily affects Intel microprocessors due to how aggressive their speculative execution and out-of-order execution is (which is done to increase performance). However, some ARM microprocessors are also affected. The reason most ARM processors aren’t affected by Meltdown though is because ARM uses two registers to store physical addresses of translation tables. One maps the user address space while the other maps the kernel address space. When trying to perform privilege checks for accessing memory, the actual translation tables need to be checked. 

## Code of a proper solution: 
Since the issue is a hardware based one, the most effective solution would be to correct the vulnerability in the architecture. For example, there is Stronger Kernel Isolation which calls for unmapping “kernel pages while the user process is in user space and switch to a separated kernel address space when entering the kernel”. This is so that user pages aren’t mapped in kernel space but in order to implement that, large portions of modern-day kernel’s would be to rewritten. 

Despite this, there is in fact a purely software workaround to Meltdown called KAISER (Kernel Address Isolation to have Side-channels Efficiently Removed). However, it has been assessed as causing a slowdown between 5 and 30 percent in certain specialized workloads, but it has only been reported to be a minimal impact from those distributing the workaround. Specifically older machines that don’t have recent processor features will be the ones hit the hardest performance wise when implementing KAISER as a security feature since KAISER takes advantage of the newer features to aid in its performance and functions. 

KAISER is a software workaround for Meltdown. It was initially created and researched as an alternative to KASLR (Kernel Address Space Layout Randomization), which had been deemed inefficient as multiple fatal flaws were found and academically exploited. However, KAISER updates the work of KASLR to overcome said flaws. KAISER provides practical kernel address isolation through the use of a shadow address page that separates kernel space from user space. There would be two address space, the shadow address space is where the user space is mapped but not the kernel and the other address space maps the kernel but the user space is protected with SMEP (Supervisor mode execution prevention) that protects against executing user space code by the kernel and SMAP (Supervisor mode access prevention) which protects invalid user memory from being mapped to the kernel.

In doing so, KAISER eliminates the use of global bits to avoid TLB (Translation Lookaside Buffer) flushes whenever there is a context switch, which increases performance since it can only access portions of the kernel that are mapped in both address spaces. A portion of the shadow address page is synchronized so that both page structures can continue to to have threads working in parallel while reducing the overlap of pages between the two address spaces.  

As stated in “KASLR is Dead: Long Live KASLR”, KAISER maps 

> the entire per-CPU section including the interrupt request (IRQ) stack and vector, the global descriptor table (GDT), and the task state segment (TSS). Furthermore, while switching to privileged mode, the CPU implicitly pushes some registers onto the current kernel stack. This can be one of the per-CPU stacks that we already mapped or a thread stack. Consequently, thread stacks need to be mapped too

KAISER protects from attacks that exploit that the kernel address space is mapped in the user space too and that access privileges can only be prevented through the permission bits in the address translation tables that will then execute system calls or interrupt routines

To find the specific code patch check: https://github.com/IAIK/KAISER

## Real World Example of the attack:
There haven’t been any documented attacks of this vulnerability in the wild. These vulnerabilities were found by multiple groups of researchers. 
