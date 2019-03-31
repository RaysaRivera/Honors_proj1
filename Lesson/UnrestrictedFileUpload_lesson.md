# Unrestricted Upload of File with Dangerous Type - CWE: 434

This vulnerability occurs when a malicious user uploads/transfers dangerous files that are processed into the host environment and can be run immediately with the program that it has intercepted. Unrestricted upload of file with dangerous type presents a large risk to the system because the uploaded file could compromise the system’s safety by exploiting local vulnerabilities, inserting a phishing page or a permanent XSS into the website, obtaining sensitive data or by overwriting files/data that other users access (can replace .htaccess file so the attacker can execute specific scripts). With .asp and .php files, these are especially dangerous since web servers often automatically execute those extensions despite the file system permissions that may not specify execution.

## Example of an attack:

HTML Portion of the code:
```
<form action="upload_picture.php" method="post" enctype="multipart/form-data">  
Choose a file to upload:  
<input type="file" name="filename"/>  
<br/>  
<input type="submit" name="submit" value="Submit"/>  
</form>  
```
PHP Portion of the code:  
Comment: // Define the target location where the picture being uploaded is going to be saved.  
```
$target = "pictures/" . basename($_FILES['uploadedfile']['name']);  
```
Comment: // Move the uploaded file to the new location.  
```
if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target)){  
    echo "The picture has been successfully uploaded.";  
}  
else {  
echo "There was an error uploading the picture, please try again.";  
}  
```

## How to prevent the attack: 

### File extension verification
File extension verification fails because it’s hard to determine which executables should be allowed and which should be filtered out. Furthermore, uncommon and rarely seen executable extensions can pass through common filters and still cause havoc like extensions: php3, php4, php5, shtml, phtml, and cgi. Additionally, if only allowing specific extensions, there is an IIS 6 semi-colon vulnerability that can allow users to upload and execute file with names such as test.asp;.jpg

### Content type verification
Content type verification method of verification relies on the header of the content, but since that is supplied by the user, it can be very easily manipulated. 

### Image content type verification 
Image content type verification is the safest method of verification because it generally uses functions associated with the file type to check if it is, in fact, the type of file anticipated. For example, using getimagesize() can confirm if the presumed image is actually an image. A downfall though is that there can be executable code included as part of the image and so it would pass the content verification while still being malicious.

## Safer Coding Practices
* Change the filename for all uploaded files so that no external input is ever used
* Consider storing uploaded files outside of web document roots
* When using input validation, allowing only alphanumeric characters help to reduce the addition of malicious extensions
* Run code on lowest privilege needed for the task. Ideally do so on individual accounts created for a single task

# Code of a proper solution: 
PHP Portion of code

```
<?php
    $currentDir = getcwd();
    $uploadDirectory = "/uploads/";

    $errors = []; // Store all foreseen and unforseen errors here

    $fileExtensions = ['jpeg','jpg','png']; // Get all the file extensions

    $fileName = $_FILES['myfile']['name'];
    $fileSize = $_FILES['myfile']['size'];
    $fileTmpName  = $_FILES['myfile']['tmp_name'];
    $fileType = $_FILES['myfile']['type'];
    $fileExtension = strtolower(end(explode('.',$fileName)));

    $uploadPath = $currentDir . $uploadDirectory . basename($fileName); 

    if (isset($_POST['submit'])) {

        if (! in_array($fileExtension,$fileExtensions)) {
            $errors[] = "This file extension is not allowed. Please upload a JPEG or PNG file";
        }

        if ($fileSize > 2000000) {
            $errors[] = "This file is more than 2MB. Sorry, it has to be less than or equal to 2MB";
        }

        if (empty($errors)) {
            $didUpload = move_uploaded_file($fileTmpName, $uploadPath);

            if ($didUpload) {
                echo "The file " . basename($fileName) . " has been uploaded";
            } else {
                echo "An error occurred somewhere. Try again or contact the admin";
            }
        } else {
            foreach ($errors as $error) {
                echo $error . "These are the errors" . "\n";
            }
        }
    }

?>
```

# Real World Example of the attack:
Earlier this year, it was discovered discovered by researcher James Bercegay that “My Cloud” a popular personal cloud storage unit had this vulnerability. By exploiting this vulnerability Bercegay could replace any file on the server and gain control over the device. The code with the vulnerability appears to be left over from an earlier project called D-Link DNS-320L since there are identical vulnerabilities and misspelled function names, but this project had the vulnerabilities corrected in 2014. 

[Test your knowledge](https://raysarivera.github.io/Honors_proj1/Lesson/UnrestrictedFileUpload_quiz)

<body>
  <p>Got feedback for us? Submit a text file below:</p>
  <input type="file" id="f">
  <input type="button" value="Upload" name="submit" onclick="clicky()">
  
  <p id="demo"></p>

  <script type="text/javascript">
    
    function clicky() {
      var str = document.getElementById("f").value;
      var ext = str.substr(str.indexOf(".") + 1);
      //document.getElementById("demo").innerHTML = ext;
      if (ext == "exe") {
        document.getElementById("demo").innerHTML = "You have uploaded a possible virus to our server, congrats!";
      }
      if (ext == "txt") {
        document.getElementById("demo").innerHTML = "Thank you for your feedback!";
      }
    }
  </script>
</body>
