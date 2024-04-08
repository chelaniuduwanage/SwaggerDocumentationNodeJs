const express = require ('express');
const { login,signup } = require('../controllers/user.controller');
const {verifyJWT} = require('../middleware/verifyJWT');
const router=express.Router();

//signup route
router.post('/register',signup);

//login route
router.post('/signin',login);

module.exports = router;