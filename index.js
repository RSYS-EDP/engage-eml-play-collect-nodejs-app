const express = require("express");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

var qs = require("qs");

const port = 3000;

const publicIp = "localhost";

app.listen(port, () => {
  console.log(`Node server is running at http://localhost:${port}`);
});

function fetchUserInputEML(req, res, next) {
  const myUrl = "http://" + publicIp + ":" + port + "/gatherAction";

  // If you are using NGROK - edit the path - see below NGROK section for details.

  // const myUrl = "https://60bc-27-7-127-107.ngrok.io/gatherAction";

  return (
    '<?xml version="1.0" encoding="UTF-8"?> <Response> <Gather input="dtmf" timeout="5" actionOnEmptyResult="true" action="' +
    myUrl +
    '"><Say> Welcome to Engage Digital Platform ! </Say> <Say> Please provide your input </Say> </Gather> </Response>'
  );
}

//***************************************** */

//Initial EML Fetch Handler

//***************************************************** */

//This is default GET method handler

app.get("/", function (req, res) {
  console.log("Printing parameters received for / (GET) ", req.query);

  // set response header

  res.status = 200;

  res.header("Content-Type", "text/xml");

  // set response content

  res.send(fetchUserInputEML());
});

// This is GET path

app.get("/eml", function (req, res) {
  console.log("Printing parameters received for /eml (GET) ", req.query);

  // set response header

  res.status = 200;

  res.header("Content-Type", "text/xml");

  // set response content

  res.send(fetchUserInputEML());
});

// This is POST method handler

app.post("/eml", function (req, res) {
  console.log("Printing parameters received for /eml (POST) ", req.body);

  // set response header

  res.status = 200;

  res.header("Content-Type", "text/xml");

  // set response content

  res.send(fetchUserInputEML());
});

//*************************************** */

// Gather action handler

//************************************* */

// This is GET path

app.get("/gatherAction", function (req, res) {
  console.log(
    "Printing parameters received for /gatherAction (GET) ",
    req.query
  );

  // set response header

  res.status = 200;

  res.header("Content-Type", "text/xml");

  // set response content

  res.send(
    '<?xml version="1.0" encoding="UTF-8"?> <Response><Say> Thank you I received input </Say></Response>'
  );
});

// This is POST method handler

app.post("/gatherAction", function (req, res) {
  console.log(
    "Printing parameters received for /gatherAction (POST) ",
    req.body
  );

  // set response header

  res.status = 200;

  res.header("Content-Type", "text/xml");

  // set response content

  res.send(
    '<?xml version="1.0" encoding="UTF-8"?> <Response><Say> Thank you I received input </Say></Response>'
  );
});

//***************************************** */

// CALL API StatusCallBack webhook handler

// ***************************************

app.get("/statuscallback", function (req, res) {
  console.log(
    "Printing parameters received for /statuscallback (GET) ",
    req.query
  );

  res.status = 200;

  // send 200 OK response

  res.send("");
});

app.post("/statuscallback", function (req, res) {
  console.log(
    "Printing parameters received for /statuscallback (POST) ",
    req.body
  );

  res.status = 200;

  // send 200 OK response

  res.send("");
});
