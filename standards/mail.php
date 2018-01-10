<? PHP 
	$name = $_POST['name'];
	if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
  		$nameErr = "Only letters and white space allowed"; 
	}

	$email = $_POST['email'];
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  		$emailErr = "Invalid email format"; 
	}
	
	$message = $_POST['message'];
	$formcontent="From: $name \n Message: $message";
	$recipient = "radueg1@stolaf.edu";
	$subject = "Contact Form";
	$mailheader = "From: $email \r\n";
	if(isset($_POST['url']) && $_POST['url'] == ''){
		mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
	}
	echo "Thank You!";
?>