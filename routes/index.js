const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.post('/logout', authController.logout);

router.post(
    '/register',
    userController.validateRegister,
    userController.apiRegister,
    authController.apiLogin,
    authController.sendLoggedInData
);

router.post('/login', authController.apiLogin, authController.sendLoggedInData);

router.post("/api/refresh", authController.refreshToken);

module.exports = router;
