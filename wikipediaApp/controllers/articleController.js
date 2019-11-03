const Article = require('../models/Article');

// Display list of all Articles.
exports.article_list = (req, res) => {
	res.send('NOT IMPLEMENTED : Article list');
};

// Display detail page of an Article.
exports.article_detail = (req, res) => {
	res.send('NOT IMPLEMENTED: Article detail');
};

// Display Article Create form on GET.
exports.article_create_get = (req, res) => {
	res.send("NOT IMPLEMENTED: Article create GET");
};

// Handle Article Create form on POST.
exports.article_create_post = (req, res) => {
	res.send("NOT IMPLEMENTED: Article create POST");
};

// Display book delelte form on GET.
exports.article_delete_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Article Delete GET');
};

// Display Article Create form on POST.
exports.article_create_POST = (req, res) => {
	res.send("NOT IMPLEMENTED: Article create POST");
}