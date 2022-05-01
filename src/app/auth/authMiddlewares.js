const authMethod = require('./authMethods');
const accountQueries = require('../DB/accountQueries');

exports.isAuth = async (req, res, next) => {

	var accessTokenFromHeader = req.header('Authorization');

	if (!accessTokenFromHeader) {
		res.json({
			error: 10007,
            error_type: "Access token not found",
            data: []
		})
		return;
	}

	if (accessTokenFromHeader.substr(0,6) == 'Bearer') {
        accessTokenFromHeader = accessTokenFromHeader.substr(7, accessTokenFromHeader.length-7)
    }

	const accessTokenSecret = "LeThaiSon";

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);

	if (!verified) {
		res.json({
            error: 10008,
            error_type: "You don't have permission to access this content",
            data: []
        })
		return;
	}

	const user = await accountQueries.getAccountBySSN(verified.payload.SSN);
	req.user = {
		SSN: user.socialSecurityNumber,
		userType: user.userType
	}
	return next();
};

exports.isAdmin = async (req, res, next) => {

	var role = req.user.userType;

	if (role != 'admin') {
		res.json({
            error: 10009,
            error_type: "Must be admin",
            data: []
        })
		return;
	}
    
	return next();
};

exports.canViewUser = async (req, res, next) => {

	var role = req.user.userType;
	var authSSN = req.user.SSN;
	var querySSN;

	if (req.param('SSN')) {
		querySSN = req.param('SSN');
	} else if (req.body.SSN) {
		querySSN = req.body.SSN;
	} else if (req.query.SSN) {
		querySSN = req.query.SSN;
	}

	if (role == 'user' && authSSN != querySSN) {
		res.json({
            error: 10011,
            error_type: "You don't have permission to do this action",
            data: []
        })
		return;
	}
    
	return next();
};

exports.isThisUser = async (req, res, next) => {

	var role = req.user.userType;
	var authSSN = req.user.SSN;
	var querySSN;

	if (req.param('SSN')) {
		querySSN = req.param('SSN');
	} else if (req.body.SSN) {
		querySSN = req.body.SSN;
	} else if (req.query.SSN) {
		querySSN = req.query.SSN;
	}

	if (role != 'user' || authSSN != querySSN) {
		res.json({
            error: 10011,
            error_type: "You don't have permission to do this action",
            data: []
        })
		return;
	}
    
	return next();
};