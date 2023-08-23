const express=require("express");
const router=express.Router();
const passport = require("passport");
const habbitController = require('../controllers/habbitController');

router.post('/create', passport.checkAuthentication ,habbitController.createHabbit);

router.get('/status-update/:id/:date', habbitController.statusUpdate);

router.get('/delete/:id', habbitController.deleteHabbit);


module.exports = router;