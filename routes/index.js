const express=require("express");
const router=express.Router();
const homeController = require('../controllers/homeController');

// route for home
router.get('/', homeController.home);

// route for userController
router.use('/users', require('./users'));

// route for habbitController 
router.use('/habbit', require('./habbit'));

module.exports = router;