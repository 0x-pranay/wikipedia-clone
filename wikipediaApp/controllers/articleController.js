const Article = require('../models/Article');
const User = require('../models/User');
const Edit = require('../models/Edit');
const Topic = require('../models/Topic');


const jsdiff = require('diff');
const {body, validationResult, sanitizeBody } = require('express-validator');


// Display list of all Articles.
exports.article_list = (req, res, next) => {
	
	Article
	.find()
	.populate('edits')
	.populate('author')
	.populate('user')
	.exec(function (err, articles){
		if(err) return next(err);

		context ={
			title: "List of all Articles",
			list_articles: articles,
		}
		res.render('article_list', {title: 'All articles', context: context });
	});

};

// Display detail page of an Article.
exports.article_detail = (req, res, next) => {
	Article.findById(req.params.id)
	.populate('edits')
	.populate('author')
	.exec(function (err, article){
		if(err) return next(err);
		
		Edit.find({ 'article': article._id})
		.sort({edited_on: -1 })
		.exec(function (err, sorted_edits){
			if(err) {return next(err);}

			const diff = (sorted_edits.length>1)?(jsdiff.diffCss(sorted_edits[0].article_summary, sorted_edits[1].article_summary)):null;
			const context= {
				edits: sorted_edits,
				author: article.author.name,
				article_title: sorted_edits[0].article_title,
				article_summary: article.edits[0].article_summary,
				created_on: article.created_on_formatted,
				topics: article.topics,
				diff: diff
				
			};
			res.render('article_detail', {title: "View Article", anchor:'#read_article', context: context});

		});

	});

};




// Display origin edit of an Article.
exports.article_view_origin = (req, res, next) => {
	Article
		.find()
		.populate('edits')
		.sort({created_on: 1 })
		.exec(function (err, article) {
			if(err) return next(err);

			console.log(article[0]);
			res.render('article_view_origin', { article: article[0] })
		});
};

// Display Article Create form on GET.
exports.article_create_get = (req, res, next) => {
	Topic.find().exec(function(err, result){
		if(err) return next(err);
		
		res.render('create_article', {title: 'Create Article', topics: result });
	});
};

// Handle Article Create form on POST.
exports.article_create_post = [
	//convert topics to an array.
	(req, res, next) => {
		if(!(req.body.topics instanceof Array)){
			if(typeof req.body.topics ==='undefined')
			req.body.topics=[];
			else
			req.body.topics = new Array(req.body.topics);
		}
		next();
	},
	
	// validate fields.
	body('article_title', 'Title must not be empty.').isLength({min: 1}).trim(),
	body('summary', 'Article must not be empty.').isLength({min: 1}).trim(),

	// Sanitize fields ??
	sanitizeBody('article_title').escape(),

	//Processing request 
	(req, res, next) => {

		// Extract validation errrors from requests.
		const errors = validationResult(req);

		var article = new Article(
			{	author: req.user,
				topics : req.body.topic,
				edits: []
			});

		var edit = new Edit({
			article : '',
			author: req.user,
			article_title: req.body.article_title,
			article_summary: req.body.summary,
			edit_summary: req.body.edit_summary,
		});
		
		if(!errors.isEmpty()){
			// There are errors. Render form again with sanitized values/ errors.

			// Get all authors and genres for form.
			Topic.find().exec(function (err, result){
				if(err) return next(err);
				for (let i=0; i< result.length; i++){
					if( article.topics.indexOf(result[i]._id) > -1){
						result[i].checked= 'true';
					}
				}
				res.render('create_article', { 
											title: 'Create Article',
											article_tile: req.body.article_title,
											summary: req.body.summary,
											topics: result,
											errors: errors.array() });
			});
			return;
		}
		else{
			// Data from is valid. Save Article.


			article.save(function(err) {
				if(err) { return next(err); }
				
				// successful - then create save edit.
				edit.article = article;
				edit.save(function (err) {
					if(err) { return next(err); }

					// Successfully created Edit, need to include edit in article.
					article.edits.push(edit);
					
					article.save( function (err){
						if(err) { return next(err); }

						// Successfully created article, edit and added relations.
						// Redirects to new article detail page.
						console.log(article.url);
						res.redirect(article.url);		
					});
				});
				

			});
		}
	}
];


// Display book delelte form on GET.
exports.article_delete_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Article Delete GET');
};

// Display Article Create form on POST.
exports.article_create_POST = (req, res) => {
	res.send("NOT IMPLEMENTED: Article create POST");
}