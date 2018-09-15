const express = require("express");
const router = express.Router();
const AuthActions = require("./../actions/AuthActions");
const HandleError = require("./../errors/HandleErrors");
const CheckTypeOfToken = require("./../validators/checkTypeOfToken");

router.post(
  "/",
  HandleError(async (req, res) => {
    const result = await AuthActions.validateAuthor(
      req.body.email,
      req.body.password
    );
    if (!result) res.status(401).send("Invalid Credentials");
    else if (result === 403)
      res.status(403).send("Please verify your Email First");
    else
      res
        .status(200)
        .header("design_token", result)
        .send("true");
  })
);

router.get(
  "/verify/:token",
  CheckTypeOfToken(),
  HandleError(async (req, res) => {
    const result = await AuthActions.verifyEmail(req.params.token);
    if (!result) res.status(401).send("Token is Expired");
    else res.status(200).send("Confirmed");
  })
);

module.exports = router;
