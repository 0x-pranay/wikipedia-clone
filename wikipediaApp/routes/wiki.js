const express = require('express');
const router = express.Router();

// Wiki Controllers
const wikiController = require('../controllers/wikiController');

// Main page for wiki
router.get('/', wikiController.index );

module.exports = router;
