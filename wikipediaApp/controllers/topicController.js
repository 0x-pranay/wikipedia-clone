var Topic = require('../models/Topic');


// Display all Topics.
exports.topic_list = (res, req) => {
	res.send("NOT IMPLEMENTED: Topic lists ");
};

// List all articles for a topic.
exports.article_list = (res, req) => {
	res.send("NOT IMPLEMENTED: Articles in a Topic");
};

// Display topic ceation form
exports.topic_create_get = (res, req)=> {
	res.send("NOT IMPLEMENTED: Create new Topic GET");
	
};

// Handle new Topic creation on POST.
exports.topic_create_post = (res, req) => {
	res.send("NOT IMPLEMENTED: Create new Topic POST");
	
};

// Handle Delete Topic  on POST.
exports.topic_delete_post = (res, req) => {
	res.send("NOT IMPLEMENTED: Delete Topic POST");
	
};
