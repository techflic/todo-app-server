
const JWT                   = require('../helpers/jwt-helper');

exports.verify = (request, response, next) => {
    if(typeof request.headers['authorization'] !== 'undefined') {
    	const bearerHeader = request.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        request.token = bearer[1];
    }else if(typeof request.headers['x-access-token'] !== 'undefined') {
    	request.token = request.headers['x-access-token'];
    }
    /*You can choose either of the way mentioned above to fetch token from request*/

    if(request.token){
    	const decoded = JWT.verify(request.token)
	    if(decoded.name && decoded.message)
	    	return response.status(500).json({ 'success': false, 'message': decoded.name + " - " +decoded.message });
	    else{
	    	request.verifiedTokenData = decoded;
	    	next();
	    }
	}else{
        response.sendStatus(403);
    }
}