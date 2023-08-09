const express=require("express");
const router=express.Router();
const passport = require("passport");
const habbitController = require('../controllers/habbitController');

router.post('/create', passport.checkAuthentication ,habbitController.createHabbit);

router.get('/delete', habbitController.deleteHabbit);


module.exports = router;