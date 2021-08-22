const express = require('express');
const userController = require('../controllers/user');
const checkAuth= require("../middleware/check-auth");
const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", userController.userLogin);
router.put('/reset',checkAuth,userController.updateUser);
router.get('',checkAuth,userController.getUsers);
router.get('/email/:id', userController.getUserEmail);
module.exports = router;