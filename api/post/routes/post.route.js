var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var PostController = require('../controllers/post.controller');

// Create new post
router.post('/create', PostController.post_create);

module.exports = router;