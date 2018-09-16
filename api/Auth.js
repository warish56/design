const express = require("express");
const router = express.Router();
const AuthActions = require("./../actions/AuthActions");
const HandleError = require("./../errors/HandleErrors");
const CheckTypeOfToken = require("./../validators/checkTypeOfToken");
const validateAuth = require("./../validators/validateAuth");

router.post(
  "/",
  validateAuth(),
  HandleError(async (req, res) => {
    const result = await AuthActions.validatePerson(
      req.body.email,
      req.body.password,
      req.query.type
    );
    if (!result) res.status(401).send("Invalid Credentials");
    else if (result === 403)
      res.status(403).send("Please verify your Email First");
    else
      res
        .status(200)
        .header("design_token", result.token)
        .send({ id: result._id, name: result.name, email: result.email });
  })
);

router.get(
  "/verify/:token",
  CheckTypeOfToken(),
  validateAuth(),
  HandleError(async (req, res) => {
    const result = await AuthActions.verifyEmail(
      req.params.token,
      req.query.type
    );
    if (!result) res.status(401).send("Token is Expired ");
    if (result === -1) res.status(404).send("User Not Found");
    if (result === 200) res.status(200).redirect("http://localhost:3000");
  })
);

module.exports = router;
