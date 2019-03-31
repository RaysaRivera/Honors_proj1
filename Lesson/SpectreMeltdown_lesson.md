# Spectre/Meltdown : CVE-2017-5715, CVE-2017-5753, CVE-2017-5754

For meltdown, this vulnerability is a hardware based one. It stems from the use of out-of-order execution in the kernel (code that takes instructions from the OS to the CPU) to improve performance. Meltdown is able to look at the memory of the operating system’s kernel and read private data regardless of if it has the privilege to access that information. In other words, meltdown works by “melting” the barrier between user applications and the OS leaving the memory susceptible to having its secrets (from memory, programs and the OS) found out.

As stated in "Meltdown: Reading Kernel Memory from User Space", Meltdown consists of 3 steps: 

> Step 1:  The content of an attacker-chosen memory location, which is inaccessible to the attacker, is loaded into a register. 

> Step 2:  A transient instruction [an instruction that is executed out of order and leaving measurable side effect] accesses a cache line based on the secret content of the register. 

> Step 3:  The attacker uses Flush+Reload [a technique where an attacker can dump the entire kernel memory by reading privileged memory in an out-of-order execution stream, and then transmit the data through a microarchitectural covert channel] to determine the accessed cache line and hence the secret stored at the chosen memory location

Spectre attacks are hardware-based vulnerabilities that stem from the use of speculative execution as well as branch prediction from microprocessors. Speculative execution is when the processor reaches a conditional branch instruction and makes a prediction as to what the conditional will return so that the program path can continue executing without slowing down performance. If the guess is right, the program has a fast performance, but if the guess is wrong, the processor returns to the last correct step and moves from there. Branch prediction is part of speculative execution and it's the portion that guesses which branch is the likelier one. As a result of malicious code, Spectre attacks can have a victim speculatively perform operations that shouldn’t occur so that it leaks the confidential information through side channels. Due to the nature of the Spectre attack, the name was given since its root cause is speculative execution and “will haunt us for quite some time.”
 
Summarized from Spectre Attacks: Exploiting Speculative Execution
Set-up Phase: the attacker performs malicious operations to mistrain the processor to make mistakes in the speculative execution and to induce it. The attacker can also prepare the covert channel to later extract the victim’s information. 
Second Phase: the processor performs speculative execution in such a way that then transfers confidential information from the victim into a microarchitectural covert channel. Other times, the attacker can use speculative (mis-)execution [through the use of mistraining the processor] of the malicious code to get the confidential information. 
Final Phase: the sensitive data is recovered through the covert channel usually using Flush+Reload or Evict+Reload


## Example of an attack:

An example of the Meltdown step of transient instructions from "Meltdown: Reading Kernel Memory from User Space":

```
1 ; rcx = kernel address, rbx = probe array 

2 xor rax, rax 

3 retry: 

4 mov al, byte [rcx] 

5 shl rax, 0xc 

6 jz retry 

7 mov rbx, qword [rbx + rax] 

```
Line 4 of the example is the beginning of the Meltdown exploit and it loads the byte value of the target kernel address from RCX into the least significant byte of RAX (AL). As this line is loaded, the CPU has likely already started executing line 5 through 7 as part of its out of order execution. 

Line 5 multiplies the secret value by the page size so that accesses to the array have some distance from one another so that the prefetcher don’t load adjacent memory locations into the cache. 

Line 6 ensure that the secret value is accurate since the side channel has a bias towards 0 and it’s looking to obtain the proper secret value. If it’s a zero, it will retry the prior instructions.  

Line 7 takes the multiplied secret value and adds the base address of the probe array so that it creates the target address of the covert channel. This target address is read to cache the appropriate cache line so that the address will be loaded into L1 data cache. 

After the transient instruction sequence has run, one cache line of the probe array is cached. By checking the position of the cached cache line in the probe array, the secret value can be discovered. The attacker needs to iterate over all the pages of the probe array and then check the access time for all offsets (first cache lines) to the page. The number of the page that contains the cached cache line has a direct relationship to the secret value.

By iterating through all possible addresses, Meltdown can retrieve entire memory dumps. This is more easily done when the attack is used in conjunction with a malicious insert of a exception handler or suppressor so that the Meltdown attack can run for a continuous amount of time without having to worry about the privilege check failing and interrupting the access of privileged data. 

A classic example of the Spectre attack is:

```
if (x < array1_size) 
y = array2[array1[x] * 256]; 
```
where x is attacker-controlled data

The purpose of the if statement is to verify the value of x is within a legal range. The attack starts by mistraining the branch predictor by continually invoking the code with valid inputs so that the branch predictor starts to expect the if statement will be true. During the next phase, the attack invokes the code with a value that is out of bounds for array1. Since the branch predictor has been mistrained, the CPU guesses the bound check will be assumed to be true and executes the following instructions: y = array2[array1[x]*4096]. Due to that instruction executing, the cache states have been changed. Even when the CPU properly checks the bounds of the if statement and determines that the condition fails, the cache remains the same. As a result, the attacker can analyze the cache to find the value of the secret byte that was read from out-of-bounds memory. 

## How to prevent the attack: 
According to the official meltdown attack website, it’s impossible to detect traces of the Meltdown/Spectre attack in traditional log file. Antivirus can potentially detect the attack but it’s unlikely since it’d be difficult to distinguish the attack from other types of regular applications. In order for an antivirus to detect the attack, it’d need to compare binaries after their values are known.

The Meltdown vulnerability primarily affects Intel microprocessors due to how aggressive their speculative execution and out-of-order execution is (which is done to increase performance). However, some ARM microprocessors are also affected. The reason most ARM processors aren’t affected by Meltdown though is because ARM uses two registers to store physical addresses of translation tables. One maps the user address space while the other maps the kernel address space. When trying to perform privilege checks for accessing memory, the actual translation tables need to be checked. 

The Spectre vulnerability affects close to all systems like Desktops, Laptops, Cloud Servers, Smartphones, etc. All modern processors capable of keeping many instructions in flight are potentially vulnerable (Intel, AMD, and ARM processors have been confirmed to have this vulnerability).

## Code of a proper solution: 
Since the issue is a hardware based one, the most effective solution would be to correct the vulnerability in the architecture. For example, there is Stronger Kernel Isolation which calls for unmapping “kernel pages while the user process is in user space and switch to a separated kernel address space when entering the kernel”. This is so that user pages aren’t mapped in kernel space but in order to implement that, large portions of modern-day kernel’s would be to rewritten. 

Despite this, there is in fact a purely software workaround to Meltdown called KAISER (Kernel Address Isolation to have Side-channels Efficiently Removed). However, it has been assessed as causing a slowdown between 5 and 30 percent in certain specialized workloads, but it has only been reported to be a minimal impact from those distributing the workaround. Specifically older machines that don’t have recent processor features will be the ones hit the hardest performance wise when implementing KAISER as a security feature since KAISER takes advantage of the newer features to aid in its performance and functions. 

KAISER is a software workaround for Meltdown. It was initially created and researched as an alternative to KASLR (Kernel Address Space Layout Randomization), which had been deemed inefficient as multiple fatal flaws were found and academically exploited. However, KAISER updates the work of KASLR to overcome said flaws. KAISER provides practical kernel address isolation through the use of a shadow address page that separates kernel space from user space. There would be two address space, the shadow address space is where the user space is mapped but not the kernel and the other address space maps the kernel but the user space is protected with SMEP (Supervisor mode execution prevention) that protects against executing user space code by the kernel and SMAP (Supervisor mode access prevention) which protects invalid user memory from being mapped to the kernel.

In doing so, KAISER eliminates the use of global bits to avoid TLB (Translation Lookaside Buffer) flushes whenever there is a context switch, which increases performance since it can only access portions of the kernel that are mapped in both address spaces. A portion of the shadow address page is synchronized so that both page structures can continue to to have threads working in parallel while reducing the overlap of pages between the two address spaces.  

As stated in “KASLR is Dead: Long Live KASLR”, KAISER maps 

> the entire per-CPU section including the interrupt request (IRQ) stack and vector, the global descriptor table (GDT), and the task state segment (TSS). Furthermore, while switching to privileged mode, the CPU implicitly pushes some registers onto the current kernel stack. This can be one of the per-CPU stacks that we already mapped or a thread stack. Consequently, thread stacks need to be mapped too

KAISER protects from attacks that exploit that the kernel address space is mapped in the user space too and that access privileges can only be prevented through the permission bits in the address translation tables that will then execute system calls or interrupt routines

To find the specific code patch check: https://github.com/IAIK/KAISER

There isn’t a proper code solution to Spectre since it’s a hardware based vulnerability. However, according to “Spectre Attacks: Exploiting Speculative Execution”, there are a variety of ways to mitigate the attacks. The first is to prevent speculative execution but doing so would cause significant performance slowdown. Software could be altered to use serializing or speculation blocking instructions and that ensures that instructions aren’t speculatively executed. Another variant of Spectre is based on indirect branch poisoning and inserting serializing instructions can against it as well. Another way to mitigate against Spectre attacks is to prevent access to secret data. This can be done by executing processes separately and the other way is to protect access to pointers by xoring them with a pseudo-random poison value. If it were possible to prevent data from entering covert channels, that would also be helpful, but that isn’t currently available in processors. Another mitigation against Spectre is to prevent branch poisoning. Google researchers have suggested the use of reptolines to protect against Spectre attacks. In their words:
>“Retpoline” sequences are a software construct which allow indirect branches to be isolated from speculative execution.  This may be applied to protect sensitive binaries (such as operating system or hypervisor implementations) from branch target injection attacks against their indirect branches.  
The name “retpoline” is a portmanteau of “return” and “trampoline.”  It is a trampoline construct constructed using return operations which also figuratively ensures that any associated speculative execution will “bounce” endlessly.

In other words and as stated as a response to the discovery of NetSpectre, Intel released the following in a statement: 
>NetSpectre is an application of Bounds Check Bypass (CVE-2017-5753), and is mitigated in the same manner – through code inspection and modification of software to ensure a speculation stopping barrier is in place where appropriate. 


## Real World Example of the attack:
There haven’t been any documented attacks of this vulnerability in the wild. These vulnerabilities were found by multiple groups of researchers. 

Consequences of the attacks' discovery:

Due to the exploits of out-of-order execution, Meltdown has changed the perspective of hardware optimizations and how they can change microarchitectural elements regardless of the proper privileges. Hardware needs to be redesigned to avoid Meltdown and Spectre attacks. Meltdown has also shown that no software is safe from side channel attacks if the hardware it’s running on isn’t secure. KAISER has been an improvement but it still requires certain address spaces to be mapped and with these attacks in mind, an even stronger isolation between user and kernel space may be required. Also, Meltdown is very dangerous for cloud providers with guests that aren’t fully virtualized which is done for performance reasons. This is because the kernel is shared among the guests and the isolation between them and everyone’s data is susceptible to Meltdown and all the data from the same host can be exposed. Either changing the infrastructure to full virtualization or the addition of KAISER will both increase costs to the provider.  

Since Spectre uses a different attack strategy than Meltdown, Spectre requires different defensive mechanisms and isn’t easily fixed. The combination of these vulnerabilities have led to a new branch of research in vulnerability defenses especially since now it’s a large question of compromising performance on the architectural level for better system security. 

Since the initial discovery of Meltdown and Spectre, even more variations of Spectre have been found and it’s expected that the number will increase as more people investigate and research. For example, NetSpectre is a variant that can remotely read a victim system’s memory without running any code on said system. 

Even web browsers have committed to protecting against Spectre Attacks, Google software engineer Charlie Reis stated that “Site Isolation does cause Chrome to create more renderer processes, which comes with performance tradeoffs” and  “there is about a 10-13 percent total memory overhead in real workloads due to the larger number of processes.” 
In mid October of 2018, MIT researchers suggested a approach to preventing Spectre attacks which is called DAWG (Dynamically Allocated Way Guard) and suggests better security without needing to compromise performance.

On October 8, 2018, Intel supposedly added hardware and firmware mitigations regarding Spectre and Meltdown vulnerabilities to its latest processors.

[Test your knowledge of Spectre/Meltdown here](https://raysarivera.github.io/Honors_proj1/Lesson/SpectreMeltdown_quiz)
