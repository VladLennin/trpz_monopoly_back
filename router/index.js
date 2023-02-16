const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const friendsController = require('../controllers/friends-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);


router.get('/users', authMiddleware, userController.getUsers);
router.post('/user/edit-avatar',userController.editAvatar)
router.post('/user/edit-login',userController.editLogin)
router.post('/user/friends', friendsController.getFriends)
router.post('/user/send-request', friendsController.sendRequest)


module.exports = router