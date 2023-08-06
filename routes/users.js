const express = require('express');
const router = express.Router();

const usersController = require('../controllers/userController');

router.get('/', usersController.profile);
router.get('/sign-in', usersController.singIn);
router.get('/sign-up', usersController.signUp);

module.exports = router;