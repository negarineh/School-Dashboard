const { ReS } = require('../../services/util.service');

/*jshint ignore:start*/
const getJWT = async function(req, res){
	let JWT = req.body;

	// return ReS(res, JWT);
	res.send(JWT);
}
module.exports.getJWT = getJWT;
/*jshint ignore:end*/
