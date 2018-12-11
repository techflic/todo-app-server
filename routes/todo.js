
// /api/v1/todo/

const express          		= require('express');
const router           		= express.Router();

const todoController 		= require('../controllers/todoController');
const verify 				= require('../helpers/utils').verify;
const path                  = require('path');
const multer                = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, './../public/uploads'))
      },
    filename: function(req, file, cb) {
        cb(null, "app-" + Date.now() + "-" + file.originalname);
    }
});
const upload = multer({
    storage: storage
}).single("file");

router.post("/upload/:userId/:todoId", verify, upload, todoController.saveTodoFile)
router.get("/upload/:userId/:todoId", todoController.getTodoFile)

router.get('/:userId', verify, todoController.getUserTodos);
router.get('/:userId/:todoId', verify, todoController.getTodo);

router.put('/', verify, todoController.createTodo);
router.put('/:userId/:todoId', verify, todoController.updateTodo);

router.delete('/:userId/:todoId', verify, todoController.deleteTodo);

module.exports = router;
