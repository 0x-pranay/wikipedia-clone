const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


//  Controllers
const wikiController = require('../controllers/wikiController');
const articleController = require('../controllers/articleController');
const topicController = require('../controllers/topicController');
const editController = require('../controllers/editController');


// GET Main page of wiki
 router.get('/', wikiController.get_index );


// test page to be used as playground.
router.get('/test', wikiController.playground);

// GET list all articles.
router.get('/articles', articleController.article_list);

// GET Create Article Page
router.get('/article/create',ensureAuthenticated, articleController.article_create_get);


// POST Handle  Article Creation.
router.post('/article/create',ensureAuthenticated, articleController.article_create_post);

// GET view article origin
router.get('/article/origin/:id', articleController.article_view_origin);

// GET view article in detail.
router.get('/article/:id', articleController.article_detail);

// POST Handle article edits.
router.post('/article/:id', editController.article_edit);


// GET fetch summary for an edit.
router.get('/edits/summary/:id', editController.json_summary)


// GET Create topic
router.get('/topic/create', topicController.topic_create_get);

// POST Create Topic
router.post('/topic/create', topicController.topic_create_post);

// GET detail Topic
router.get('/topic/:id', topicController.topic_detail);


module.exports = router;
