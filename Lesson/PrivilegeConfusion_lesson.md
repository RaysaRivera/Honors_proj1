# Privilege Confusion

Privilege confusion is a software vulnerability where the computer or user mistakenly give a program or website permission to do an unexpected action. There are many vulnerabilities and attacks that fall into this category, including clickjacking, CSRF, and FTP bounce.

The most basic form of this attack would be using the privileges of a middle system to execute an attack requiring higher privileges, assuming that middle system does not check the attacker's privileges before executing. This middle system is sometimes referred to as the "confused deputy", a reference to the cultural trope of a bumbling police officer who often aids in a criminal's plan unwittingly. 

On web sites, malicious links can be placed invisibly over attractive, safe links, tricking a user into clicking the malicious link. This attack, called "clickjacking", takes advantage of a single click process already used either on the computer itself or a different website. If a user is always logged into amazon.com, and enables one-click ordering, clickjacking could allow an attacker buy an item on amazon using the user's account. Similarly, if a user is always logged into their facebook, an attacker could overlay the like button of a facebook page on a normal link, gaining likes for the facebook page invisibly. 

Due to the large prevalence and usage of clickjacking attacks throughout the internet, many defenses have been adapted to prevent such attacks. Sites subjected to clickjacking attacks such as banks can prevent attacks by using a "frame buster". Frame-busting scripts prevent a page from being loaded underneath another page, and instead "bust" out of the frame and into its own page. This will make it clear to the user that a separate page has been loaded and prevent a user from making an unexpected decision. Frame-busters are not impenetrable, and can be beaten by other scripts to prevent frame-busters from running, and other specific preventative attacks. As such, this type of push-and-pull is ambiguous to the arms race of any hacker versus defender. 

X-Frame-Options can also be used by website programmers to prevent their content from loading in other windows, to prevent being invisibly overlayed and clickjacked by a malicious website. These are the most common and strong forms of prevention for clickjacking.

Cross-Site Request Forgery (CSRF) is an attack similar to clickjacking, in which a user is tricked into submitting a malicious request, assuming it is something else. This is often seen in spam emails, and uses more social engineering than clickjacking generally does. This attack often takes advantage of simple HTTP requests, such as GET, POST, or PUT. By convincing a user to click something that executes these malicious requests, attackers can download a file, or send a request to a site such as a bank to transfer funds from one account to another. These requests will be disguised as a link to family photos, or sales of items a user would buy quickly. More advanced attacks will take advantage of images automatically loading in an email, sending the malicious requests with no action from the user. 

These attacks rely on the fact that users in the modern era will stay signed in to sites to allow for ease of convenience. Basic prevention includes not staying signed in to important and vulnerable sites such as banks or money transfer websites. The most popular form of CSRF is links and images in emails, so other defenses from these attacks include strong spam filters and user education. Companies now see the need for employee education of email attacks, showing basic users how to spot attacks and what to do and not do in such situations. More technical defenses include website programmers requiring multiple actions to enable malicious requests, and session authentication using cookies and secret random variables. 

In 2008, an attack was discovered that would allow a CSRF attack to enable secret downloading of a torrent file using uTorrent or bittorrent, which then downloaded malicious code. This code then gained administrator access on windows machines to allow for more malicious executions. It is unknown how many systems were subject to this attack, though it is estimated to be in the millions. [Here is the NVD page](https://nvd.nist.gov/vuln/detail/CVE-2008-6586).


<style>
.button {
  background-color: #4895a8;
  color: white;
  padding: 15px 20px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}
.button:hover {
  background-color: #285763;
}
</style>
<form>
<input class="button" type = "button" onclick="window.location.href = 'https://raysarivera.github.io/Honors_proj1/Lesson/PrivilegeConfusion_quiz'" value = "Test Your Knowledge Here!"> </form>
