const express=require("express");
const router=express.Router();
const habbitController = require('../controllers/habbitController');

router.post('/create', habbitController.createHabbit);

router.get('/delete', habbitController.deleteHabbit);


module.exports = router;