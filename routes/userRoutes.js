const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgetPassword', authController.forgetPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//all route  below this route are protected
router.use(authController.protect);

router.patch(
  '/updateMyPassword',

  authController.updatePassword
);
//routes related to me
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
//deactivating account
router.delete('/deleteMe', userController.deleteMe);

router.route(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
