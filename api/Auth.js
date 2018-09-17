const express = require("express");
const router = express.Router();
const AuthActions = require("./../actions/AuthActions");
const HandleError = require("./../handleError/HandleErrors");
const CheckTypeOfToken = require("./../validators/checkTypeOfToken");
const validateAuthType = require("./../validators/validateAuthType");
const validateResetPassword = require("./../validators/validateResetPassword");
const validateLogin = require("./../validators/validateLogin");
const IsAdmin = require("./../validators/IsAdmin");
//  route for login
router.post(
  "/",
  IsAdmin(),
  validateAuthType(),
  validateLogin(),
  HandleError(async (req, res) => {
    const result = await AuthActions.validatePerson(
      req.body.email,
      req.body.password,
      req.query.type
    );
    res
      .status(200)
      .header(
        req.query.type === "user" ? "user_token" : "author_token",
        result.token
      )
      .send({
        id: result._id,
        name: result.name,
        email: result.email,
        type: req.query.type
      });
  })
);

//  route for sending password Reset Link
router.post(
  "/reset_pass",
  validateAuthType(),
  HandleError(async (req, res) => {
    const result = await AuthActions.sendResetPasswordLink(
      req.body.email,
      req.query.type
    );
    res.status(200).send("Email Sent");
  })
);

//  route for changing the password after redirecting from email
router.post(
  "/reset_pass/:token",
  AuthActions.verifyResetPasswordToken(),
  validateResetPassword(),
  HandleError(async (req, res) => {
    const result = await AuthActions.resetPassword(
      req.token,
      req.body.password
    );
    res.status(200).send("Password Reset Done");
  })
);

//  route for verifying user after redirecting from email and marking them as confirmed
router.get(
  "/verify/:token",
  CheckTypeOfToken(),
  validateAuthType(),
  HandleError(async (req, res) => {
    const result = await AuthActions.verifyEmail(
      req.params.token,
      req.query.type
    );
    if (result === 200) res.status(200).send("confirmed");
  })
);

module.exports = router;
