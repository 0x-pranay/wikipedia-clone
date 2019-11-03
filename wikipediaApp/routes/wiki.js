const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


//  Controllers
const wikiController = require('../controllers/wikiController');
const articleController = require('../controllers/articleController');
const topicController = require('../controllers/topicController');


// GET Main page of wiki
 router.get('/',ensureAuthenticated, wikiController.get_index );

// POST Main page of wiki for editing.
router.post('/',ensureAuthenticated, wikiController.post_index );

// test page to be used as playground.
router.get('/test', wikiController.playground);

// GET Create Article Page
router.get('/article/create', articleController.article_create_get);

// POST Handle  Article Creation.
router.post('/article/create', articleController.article_create_post);

// GET Create topic
router.get('/topic/create', topicController.topic_create_get);

// POST Create Topic
router.post('/topic/create', topicController.topic_create_post);

// GET detail Topic
router.get('/topic/:id', topicController.topic_detail);


module.exports = router;
