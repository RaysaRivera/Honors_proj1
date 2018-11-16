# Spectre/Meltdown : CVE-2017-5715, CVE-2017-5753, CVE-2017-5754

For meltdown, this vulnerability is a hardware based one. It stems from the use of out-of-order execution in the kernel (code that takes instructions from the OS to the CPU) to improve performance. Meltdown is able to look at the memory of the operating system’s kernel and read private data regardless of if it has the privilege to access that information. In other words, meltdown works by “melting” the barrier between user applications and the OS leaving the memory susceptible to having its secrets (from memory, programs and the OS) found out.

## Example of an attack:

## How to prevent the attack: 
According to the official meltdown attack website, it’s impossible to detect traces of the Meltdown/Spectre attack in traditional log file. Antivirus can potentially detect the attack but it’s unlikely since it’d be difficult to distinguish the attack from other types of regular applications. In order for an antivirus to detect the attack, it’d need to compare binaries after their values are known.

## Code of a proper solution: 
Since the issue is a hardware based one, the most effective solution would be to correct the vulnerability in the architecture.  

Despite this, there is in fact a purely software workaround to Meltdown. However, it has been assessed as causing a slowdown between 5 and 30 percent in certain specialized workloads, but it has only been reported to be a minimal impact from those distributing the workaround. 

On October 8, 2018, Intel supposedly added hardware and firmware mitigations regarding Spectre and Meltdown vulnerabilities to its latest processors.

## Real World Example of the attack:
There haven’t been any documented attacks of this vulnerability in the wild. These vulnerabilities were found by multiple groups of researchers. 
