const express = require('express');
const router = express.Router();

const usersController = require('../controllers/userController');

router.get('/', usersController.profile);

module.exports = router;