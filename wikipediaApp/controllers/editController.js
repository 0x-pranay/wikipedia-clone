const Edit = require('../models/Edit');

exports.json_summary = (req, res, next)=>{
	Edit.findById(req.params.id)
	.exec(function(err, result){
		if(err) return next(err);

		// send summary data which is in HTML.
		res.set('contenty-Type', 'text/html');
		res.send(result.article_summary);
	});

};