
var express          = require('express');
var router           = express.Router();

router.use('/user', require('./user.js'))

router.use('/todo', require('./todo.js'));

module.exports = router;
