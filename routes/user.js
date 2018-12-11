
// /api/v1/user/

const express          		= require('express');
const router           		= express.Router();

const userController 		= require('../controllers/userController');
const verify 				= require('../helpers/utils').verify;


router.post('/', userController.loginUser);

router.get('/', verify, userController.getAllUsers);
router.get('/:id', verify, userController.getUser);

router.put('/', userController.registerUser);
router.put('/:id', verify, userController.updateUser);

router.delete('/:id', verify, userController.deleteUser);

module.exports = router;
