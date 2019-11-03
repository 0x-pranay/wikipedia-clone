const Topic = require('../models/Topic');

const { body, validationResult, sanitizeBody} = require('express-validator');


// Display all Topics.
exports.topic_list = (req, res) => {
	res.send("NOT IMPLEMENTED: Topic lists ");
};

// List all articles for a topic.
exports.article_list = (req, res) => {
	res.send("NOT IMPLEMENTED: Articles in a Topic");
};

// Details of a particular topic
exports.topic_detail = (req, res)=>{
	res.send("NOT implemented: Topic detail of "+ req.params.id )
}

// Display topic ceation form
exports.topic_create_get = (req, res)=> {
	res.render('topic_form', {title: 'Add new topic'});	
};

// Handle new Topic creation on POST.
exports.topic_create_post = [

	// Validate that the name field is not empty.
	body('topic', 'Topic name required').isLength({min: 1}).trim(),
	
	// sanitize the name
	sanitizeBody('topic').escape(),

	// Process request after validation and sanitation
	(req, res, next) => {
		const errors = validationResult(req);

		let topic = new Topic(
			{ name: req.body.topic }
		);
		if(!errors.isEmpty()){
			res.render('topic_form', { title: 'Add new Topic', topic: topic, errors: errors.array()});
			return;
		}
		else {
			Topic.findOne({'name': req.body.topic })
			.exec( (err, found_topic) => {
				if(err) return next(err);
				if(found_topic){
					res.redirect(found_topic.url);
				}
				else {
					topic.save((err) => {
						if(err) return next(err)
						res.redirect(topic.url);
					});
				}
			});
		}
	}
]

// Handle Delete Topic  on POST.
exports.topic_delete_post = (req, res) => {
	res.send("NOT IMPLEMENTED: Delete Topic POST");
	
};
