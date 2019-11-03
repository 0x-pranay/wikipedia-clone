const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


//  Controllers
const wikiController = require('../controllers/wikiController');
const articleController = require('../controllers/articleController');


//GET Main page of wiki
 router.get('/',ensureAuthenticated, wikiController.get_index );

// POST Main page of wiki for editing.
router.post('/',ensureAuthenticated, wikiController.post_index );

// test page to be used as playground.
router.get('/test', wikiController.playground);

// GET Create Article Page
router.get('/article/create', articleController.article_create_get);


module.exports = router;
