const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


// Wiki Controllers
const wikiController = require('../controllers/wikiController');

//GET Main page of wiki
// router.get('/', wikiController.get_index );

// POST Main page of wiki for editing.

router.get('/',ensureAuthenticated, wikiController.post_index );

module.exports = router;
