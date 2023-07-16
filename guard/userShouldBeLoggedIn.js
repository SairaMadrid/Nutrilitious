var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  //get the token from the headers
  //take care of the case where there is no token
  const header = req.headers["authorization"] || ""; //extracts the value of the "Authorization" header from the incoming request. If header is empty, it defaults to empty string
  const token = header.replace(/^Bearer\s/, ""); //replace() method needs a value (hence, ""); removes "Bearer" prefix from the authorization header using regex expression, so that only the token part remains
  if (!token) {
    //checks if there is no token or a token is incorrect
    res.status(401).send({ message: "please provide a token" }); //401 Unauthorized
  } else {
    jwt.verify(token, supersecret, function (err, decoded) {
      //jwt.verify() verifies token authenticity. It requires the token itself, the supersecret and callback fn to handle the verification result
      if (err)
        res.status(401).send({
          message: err.message,
        });
      //if error occurs (invalid or expired token) -> 401 Unauthorized
      else {
        //if token is successfully verified:
        req.id = decoded.id; //callback fn receives a decoded payload (e.g. 'id' property in the decoded payload, and then assigns it to req.id)
        next(); //passes control to the next middleware(eg.the guard function) indicating that the the user is authenticated
      }
    });
  }
}
//payload is the second part of the token which contains the claims or statements about the entity (user, device, etc.) and additional data
//payload is a JSON object that typically consists of predefined claims such as sub (subject), iss (issuer), exp (expiration time), nbf (not before), and iat (issued at), as well as custom claims specific to your application. These claims provide information about the token and can include user-related data, roles, permissions, or any other relevant information.

module.exports = userShouldBeLoggedIn;
