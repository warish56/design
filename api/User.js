const express = require("express");
const router = express.Router();
const HandleError = require("./../errors/HandleErrors");
const UserActions = require("./../actions/UserActions");
const validateUser = require("./../validators/validateUser");

router.post(
  "/",
  validateUser(),
  HandleError(async (req, res) => {
    const result = await UserActions.addUser(req.body);
    if (!result) return res.status(400).send("Email Alredy Registered");
    else res.status(200).send({ name: result.name, email: result.email });
  })
);

module.exports = router;
