# engage-sample-play-collect-server-application
This application demonstrates sample play-collect server application that can be used to simulate statuscallbacks and EML handling use-cases on customer side



Pre-requisites 

Software Installations
Node.js needs to be installed to use this application 

Source Code Download
Download the sample play-collect server application for the current repository as a zip file or clone the repository

Lets assume you have unzipped/cloned the repository to directory named "myapp"
$ cd myapp

Use the npm init command to create a package.json file for your application. 
$ npm init

Note: This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit ENTER to accept the defaults.

Now install Express in the myapp directory and save it in the dependencies list. For example:
$ npm install express --save

5.1.2	Create Server Application
Below are the Node.js examples using Gather and Say verbs.  
5.1.2.1	Gather DTMF Input
Below application will receive a HTTP POST request, in response it will send EML to fetch DTMF input from user. On user input/noinput call will be disconnected after playing a “Thank You” prompt.
In the myapp directory, create a file named index.js and copy in the code from the example above.
const express = require('express')
const app = express()
app.use(express.urlencoded({
    extended: true
}))
var qs = require('qs');
const port = 3000
const publicIp = "localhost";

app.listen(port, () => {
  console.log(`Node server is running at http://localhost:${port}`)
})

function fetchUserInputEML(req, res, next){ 
	const myUrl = "http://" + publicIp + ":" + port + "/gatherAction";

// If you are using NGROK – edit the path - see below NGROK section for details. 
// const myUrl = “https://60bc-27-7-127-107.ngrok.io/gatherAction”;
	return '<?xml version="1.0" encoding="UTF-8"?> \
		<Response> <Gather input="dtmf" timeout="5" actionOnEmptyResult="true" action="' + myUrl + '"> \
		<Say> Welcome to Engage Digital Platform ! </Say> <Say> Please provide your input </Say> </Gather> </Response>';
}
//***************************************** */
//Initial EML Fetch Handler
//***************************************************** */
//This is default GET method handler
app.get('/', function (req, res) {
	console.log("Printing parameters received for / (GET) ", req.query);
	
    // set response header
    res.status = 200;
    res.header("Content-Type", "text/xml");
    
    // set response content    
	res.send(fetchUserInputEML())
});

// This is GET path 
app.get('/eml', function (req, res) {
	console.log("Printing parameters received for /eml (GET) ", req.query);
	
    // set response header
    res.status = 200;
    res.header("Content-Type", "text/xml");
        
    // set response content    
	res.send(fetchUserInputEML())
	
});

// This is POST method handler
app.post('/eml', function (req, res) {
	console.log("Printing parameters received for /eml (POST) ", req.body);
    // set response header
    res.status = 200;
    res.header("Content-Type", "text/xml");
        
    // set response content    
	res.send(fetchUserInputEML())
});

//*************************************** */
// Gather action handler 
//************************************* */
// This is GET path 
app.get('/gatherAction', function (req, res) {
	console.log("Printing parameters received for /gatherAction (GET) ", req.query);
	
    // set response header
    res.status = 200;
    res.header("Content-Type", "text/xml");
        
    // set response content    
    res.send('<?xml version="1.0" encoding="UTF-8"?> <Response><Say> Thank you I received input </Say></Response>');

});
// This is POST method handler
app.post('/gatherAction', function (req, res) {
	console.log("Printing parameters received for /gatherAction (POST) ", req.body);
    // set response header
    res.status = 200;
    res.header("Content-Type", "text/xml");
        
    // set response content    
    res.send('<?xml version="1.0" encoding="UTF-8"?> <Response><Say> Thank you I received input </Say></Response>');
});

//***************************************** */
// CALL API StatusCallBack webhook handler
// ***************************************
app.get('/statuscallback', function (req, res) {
    console.log("Printing parameters received for /statuscallback (GET) ", req.query);

	res.status = 200;
    // send 200 OK response    
	res.send('');

});
app.post('/statuscallback', function (req, res) {
    console.log("Printing parameters received for /statuscallback (POST) ", req.body);
	
	res.status = 200;
    // send 200 OK response    
	res.send('');
});

Note: Make sure 3000 port is free, if 3000 port is used by any other application you can change the port.
If you have public ip replace localhost in line:8 with your public ip and jump to section 5.1.4. If you don’t know the public ip continue with section 5.1.3. 
5.1.3	Application behind NAT (Optional)
You can use NGROK (ngrok.com) to expose your local machine to internet. It’s a quick way to test web application from internet. You can let EDP interact with your application running on local machine without really having a public IP or domain name. 

Below mentioned steps needs to be executed if your application is running behind NAT. Otherwise jump to section 5.1.4.

•	Download ngrok from https://ngrok.com/download
•	ngrok binary is a command line executable.
•	Run the following command. 

Here is sequence of commands if you are using linux machine. 
$wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
$unzip ngrok-stable-linux-amd64.zip
$rm ngrok-stable-linux-amd64.zip
$chmod 755 ngrok
$sudo mv ngrok /usr/bin/
$ngrok http 3000

This command will provide you the public URL which you can use in the application. In the sample show http://60bc-27-7-127-107.ngrok.io and https://60bc-27-7-127-107.ngrok.io are the public URL.
 
The path referred in sample application can be used with NGROK tunnel URL as illustrated below. Only https example is listed below but you can use http also likewise. Note you will have to change the NGROK tunnel URL as per your local setting: 
Path 	Public URL (using NGROK)
/eml	https://60bc-27-7-127-107.ngrok.io/eml
/gatherAction	https://60bc-27-7-127-107.ngrok.io/gatherAction
/statuscallback	https://60bc-27-7-127-107.ngrok.io/statuscallback

/ (no path specified)	https://60bc-27-7-127-107.ngrok.io/

5.1.4	Run Server Application
Run the app with the following command:
$ node index.js




### Making a Call
The following example shows a SIP URI in the "To:" number, which is used for the SIP or WebRTC endpoints. The "To:" number can also be a PSTN number where the "To:" number can be set to “8080808080”.

Perform the following steps to make a call using EDP.
To make a call using the EDP, execute the server application with the following command.

-----------------
curl -k -XPOST https://<<base URL>>/api/v1/accounts/{AccID}/call \
--header 'apikey: <<Your API Key>>' \
--header 'Content-Type: application/json' \
--d '{
"From":"6070707112",
"To":sip:123456787@sipaz1.engageio.com,
"Url":https://<YOUR_PUBLIC_IP>:3000/eml,
"StatusCallback": https://<YOUR_PUBLIC_IP>:3000/statuscallback,
"StatusCallbackEvent":"initiated,ringing,answered,completed",
"StatusCallbackMethod":"POST",
"Type":"voice"
}'
-----------------


NOTE: The apikey and AccID are accessed from the Engage Portal.

Replace the <YourApplicationPublicIp> with the IP address of your server. If you are using the application behind NAT (NGROK), the ‘Url’ and ‘StatusCallback’ parameters are mentioned as below.

------------------
curl -k -XPOST https://<<base URL>>/api/v1/accounts/{AccID}/call \
--header 'apikey: <<Your API Key>>' \
--header 'Content-Type: application/json' \
--d '{
"From":"6070707112",
"To":sip:123456787@sipaz1.engageio.com,
"Url":https://60bc-27-7-127-107.ngrok.io/eml,
"StatusCallback": https://60bc-27-7-127-107.ngrok.io/statuscallback,
"StatusCallbackEvent":"initiated,ringing,answered,completed",
"StatusCallbackMethod":"POST",
"Type":"voice"
}'
-----------------

