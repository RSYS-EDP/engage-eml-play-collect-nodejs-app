# engage-sample-play-collect-server-application
This application demonstrates sample play-collect server application using an API call and Engage markup language (EML). It also showcases the statuscallback events to the server application.



<h2>Pre-requisites</h2>

<h3>Software Installations</h3>
Node.js needs to be installed to use this application 

<h3>Source Code Download</h3>
Download the sample play-collect server application for the current repository as a zip file or clone the repository

<h3>Steps</h3>
<p>Lets assume you have unzipped/cloned the repository to directory named "myapp"<br>
$ cd myapp <br>

Use the npm init command to create a package.json file for your application.<br>
$ npm init <br>

Note: This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit ENTER to accept the defaults.<br>

Now install Express in the myapp directory and save it in the dependencies list. For example:<br>
$ npm install express --save<br>


Note: <br>
<ul>
<li>Make sure 3000 port is free, if 3000 port is used by any other application you can change the port</li>
<li>index.js contains localhost as ip address. If you have public ip replace localhost with your public ip and jump to section "How to run application". If you don’t know the public ip continue with section 5.1.3</li>
</ul>
</p>

<h3>Application behind NAT (Optional)</h3>
<p>You can use NGROK (ngrok.com) to expose your local machine to internet. It’s a quick way to test web application from internet. You can let EDP interact with your application running on local machine without really having a public IP or domain name. </p>

<p>Below mentioned steps needs to be executed if your application is running behind NAT. Otherwise jump to section 5.1.4.</p>

<ul>
	<li>Download ngrok from https://ngrok.com/download</li>
	<li>ngrok binary is a command line executable.</li>
	<li>Run the following command. </li>
</ul>

<p>Here is sequence of commands if you are using linux machine. 
<ul>
	<li>$wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip</li>
	<li>$unzip ngrok-stable-linux-amd64.zip</li>
	<li>$rm ngrok-stable-linux-amd64.zip</li>
	<li>$chmod 755 ngrok</li>
	<li>$sudo mv ngrok /usr/bin/</li>
	<li>$ngrok http 3000</li>
</ul>

<br>This command will provide you the public URL which you can use in the application. In the sample show http://60bc-27-7-127-107.ngrok.io and https://60bc-27-7-127-107.ngrok.io are the public URL.
</p>

<p>
The path referred in sample application can be used with NGROK tunnel URL as illustrated below. Only https example is listed below but you can use http also likewise. Note you will have to change the NGROK tunnel URL as per your local setting: <br>

| Path                  | Public URL (using NGROK)                          |
|-----------------------|---------------------------------------------------|
| /eml                  | https://60bc-27-7-127-107.ngrok.io/eml            |
| /gatherAction         | https://60bc-27-7-127-107.ngrok.io/gatherAction   |
| /statuscallback       | https://60bc-27-7-127-107.ngrok.io/statuscallback |
| / (no path specified) | https://60bc-27-7-127-107.ngrok.io/               |
	
</p>

<h3>Run Server Application</h3>
<p>Run the app with the following command:<br>
$ node index.js
</p>




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

