var reqlog = require('reqlog');

// initialize the responseBuilder to create the basic structure of the response
exports.init = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.setHeader('Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept');
	res.setHeader('Content-Type', 'application/json');

	// save the basic structure on the req.response
	req.response = {
		data: null,
		meta: {
			statusCode: null
		}
	};

	reqlog.info('responseBuilder.init.success');

	next();
};

// the function that is called to send the actual response
exports.send = function(req, res, data) {
	// the statusCode is set only if there is an error, otherwise.. OK :D
	if (!req.response.meta.statusCode) {
		req.response.meta.statusCode = 'OK';
	}

	if (data) {
		req.response.data = data;
	}

	reqlog.info('responseBuilder.send.success', req.response);
	res.end(JSON.stringify(req.response));
};

exports.error = function(req, res, errorCode) {
	reqlog.info('responseBuilder.errorFound', errorCode);

	req.response.meta.statusCode = errorCode;
	this.send(req, res);
};
