const express = require('express');
const { adminSignUp, adminSignIn } = require('../Controllers/adminController');

const adminRouter = express.Router();

adminRouter.post('/adminSignUp', adminSignUp);
adminRouter.post('/adminSignIn', adminSignIn);

module.exports = adminRouter;