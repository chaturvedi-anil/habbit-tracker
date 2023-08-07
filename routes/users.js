const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/userController');

router.get('/profile',usersController.profile);

router.get('/sign-in', usersController.singIn);
router.get('/sign-up', usersController.signUp);

router.post('/create', usersController.create);

// use passport as a middileware to authenticate
router.post('/create-session',usersController.createSession);

module.exports = router;