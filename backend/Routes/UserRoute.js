const express = require('express');
const { registerUser, LoginUser, Logout, forgetPassword, getUserDetail, UserPasswordUpdate, UpdateUserProfile, getAllUsers, getSingleUser, UpdateUserRole, DeleteUser } = require('../Controllers/UserControler');
const { isAuthenticatedUser, authorizedRole } = require('../middleware/auth');
const router= express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(LoginUser);
router.route('/logout').post(Logout);
//router.route('/password/forgot').post(forgetPassword);

// users
router.route('/me').get(isAuthenticatedUser,getUserDetail)
router.route('/password/update').put(isAuthenticatedUser,UserPasswordUpdate)
router.route('/me/update').put(isAuthenticatedUser,UpdateUserProfile)

router.route('/admin/users').get(isAuthenticatedUser,authorizedRole("admin"),getAllUsers);
router.route('/admin/user/:id')
    .get(isAuthenticatedUser,authorizedRole("admin"),getSingleUser)
    .put(isAuthenticatedUser,authorizedRole("admin"),UpdateUserRole)
    .delete(isAuthenticatedUser,authorizedRole("admin"),DeleteUser)
module.exports = router;
