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


exports.article_edit = [

	// validating form fields and return error message for invalid fields. 
	body('article_title', 'Title must not be empty').isLength({ min: 1}).trim(),
	body('article_summary', 'Title must not be empty').isLength({ min: 1}).trim(),
	body('edit_summary', 'commit message must not be empty').isLength({ min: 1}).trim(),

	// sanitizing fields.
	sanitizeBody('article_title').escape(),
	sanitizeBody('edit_summary').escape(),


	(req, res, next) => {
		
		// Extract validation errors for request.
		const errors = validationResult(req);

		if(!errors.isEmpty()){
			// There are errors. Render again with sanitized fields
			Article.findById(req.params.id)
			.populate('author')
			.populate('edits')
			.sort({ edited_on: -1 })
			.exec( function(err, article){
				if(err) return next(err);

				let context = {
					id: req.params.id,
					edits: article.edits,
					edit_id: article.edits[0]._id,
					author: article.author.name,
					article_title: req.body.article_title,
					article_summary: req.body.article_summary,
					edit_summary: req.body.edit_summary,
					created_on: article.created_on_formatted,
				};
				console.log(JSON.stringify(errors));
				res.render('article_detail', { title: "Edit Article", anchor:'#edit_article', context: context, errors: errors.array() });
			});
		}
		else {
			// Data is valid.

			Article.findById(req.params.id)
			.populate('author')
			.populate('edits')
			.exec(function(err, article){
				if (err) { return next(err); }
				var edit = new Edit({
					article: article._id,
					author: req.user,
					article_title: req.body.article_title,
					article_summary: req.body.article_summary,
					edit_summary: req.body.edit_summary,

				});
				edit.save(function(err){
					if(err) { return next(err); }

					// successfully created edit object and included in the parent article.
					article.edits.push(edit);

					article.save(function(err){
						if(err) return next(err);

						// successfully pushed recent edit into parent article array.
						console.log("Successfully pushed edit"+ edit._id + " into parent article ID:" + article._id);
						res.redirect(article.url);
					});
				});

			});
		}
	}
];