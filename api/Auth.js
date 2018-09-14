const express = require("express");
const router = express.Router();
const AuthActions = require("./../actions/AuthActions");
const HandleError = require("./../errors/HandleErrors");

router.post(
  "/",
  HandleError(async (req, res) => {
    const result = await AuthActions.validateAuthor(
      req.body.email,
      req.body.password
    );
    if (!result) res.status(401).send("Invalid Credentials");
    else
      res
        .status(200)
        .header("design_token", result)
        .send("true");
  })
);

module.exports = router;
