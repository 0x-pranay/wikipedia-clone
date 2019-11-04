const Edit = require('../models/Edit');
const Article = require('../models/Article');
const User = require('../models/User');
const Topic = require('../models/Topic');


const {body, validationResult, sanitizeBody } = require('express-validator');

exports.json_summary = (req, res, next)=>{
	Edit.findById(req.params.id)
	.exec(function(err, result){
		if(err) return next(err);

		// send summary data which is in HTML.
		res.set('contenty-Type', 'text/html');
		res.send(result.article_summary);
	});

};

// Handle Article Edits
exports.article_edit = (req, res, next) => [

	// validate fields.
	body('article_title', 'Title must not be empty.').isLength({min: 1}).trim(),
	body('summary', 'Article must not be empty.').isLength({min: 1}).trim(),

	// Sanitize fields ??
	sanitizeBody('article_title').escape(),
	sanitizeBody('article_summary').escape(),
	
	(req, res, next) => {

		// Extract validation errors from requests.
		const errors = validationResult(req);

		var edit = new Edit({
			article: req.params.id,
			author: req.user,
			article_title: req.body.article_title,
			article_summary: req.body.article_summary,
			edit_summary: req.body.edit_summary,
		});

		if(!errors.isEmpty()){
			// There are errors. Render again with sanitized fields
			Article.findById(req.params.id)
				.poupulate('edits')
				.populate('author')
				.sort({ timestamp: -1})
				.exec(function(err, article){
					if(err) return next(err);
					
					let context ={
						id: req.params.id,
						edit_id: article.edits[0]._id,
						author: article.author.name,
						article_title: req.body.article_title,
						article_summary: req.body.article_summary,
						created_on: article.created_on_formatted,
					};
					res.redirect('article_detail', { title: "Edit Article", context: context});

				});
				return;
		
		}
		else {
			//  Data is valid. save the edit and add it to article's arrray of edits.
			edit.save(function(err){
				if(err) { return next(err); }

				//  edit recording successfull- need to include edit in article.
				Article.findById(req.params.id)
				.populate('edits')
				.exec( function (err, article){
					if(err) return next(err);

					article.edits.push(edit);
					article.save(function(err) {
						if(err) { return next(err);}

						// Successfully included the edit in parent article.
						// redirects to article url.
						res.redirect(article.url);
					});
				});
				 
			});

		}
		

	}
];