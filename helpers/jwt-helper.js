const fs            = require('fs');
const jwt           = require('jsonwebtoken');

const privateKEY    = fs.readFileSync('./secrets/private.key', 'utf8');    // use 'utf8' to get string instead of byte array
const publicKEY     = fs.readFileSync('./secrets/public.key', 'utf8');      // use 'utf8' to get string instead of byte array

let dOptions = {
    issuer      : 'xxxxxx',                   // Issuer - Software organization who issues the token.
    subject     : 'xxxxxxxxxx',               // Subject - Intended user of the token.
    audience    : 'xxxxxxxxxxxx',             // Audience - Basically identity of the intended recipient of the token. this should be provided by client.
    expiresIn   : '6h',                       // ExpiresIn - Expiration time after which the token will be invalid.
    algorithm   : 'RS512'                     // Algorithm - Encryption algorithm to be used to protect the token.
}

module.exports = {
    sign: (payload, sOptions) => {
        let signOptions = {
            issuer:  dOptions.issuer,
            subject:  dOptions.subject,
            audience:  dOptions.audience,
            expiresIn:  dOptions.expiresIn,
            algorithm:  dOptions.algorithm  
        };
        return jwt.sign(payload, privateKEY, signOptions);
    },
    verify: (token, vOptions) => {
        let verifyOptions = {
            issuer:  dOptions.issuer,
            subject:  dOptions.subject,
            audience:  dOptions.audience,
            expiresIn:  dOptions.expiresIn,
            algorithm:  [dOptions.algorithm]
        };
        try {
            return jwt.verify(token, publicKEY, verifyOptions);
        } catch(err) {
            return err
        }
    },
    decode: (token) => {
        return jwt.decode(token, {complete: true}); //returns null if token is invalid
    }
}