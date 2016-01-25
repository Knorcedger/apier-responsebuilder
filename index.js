var reqlog = require('reqlog');

// initialize the responseBuilder to create the basic structure of the response
exports.init = function(req, res, next) {
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

	req.response.data = data;

	reqlog.info('responseBuilder.send.success', req.response);
	res.end(JSON.stringify(req.response));
};
