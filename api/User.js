const express = require("express");
const router = express.Router();
const HandleError = require("./../handleError/HandleErrors");
const UserActions = require("./../actions/UserActions");
const validateUser = require("./../validators/validateUser");

//  route for adding a new User
router.post(
  "/",
  validateUser(),
  HandleError(async (req, res) => {
    const result = await UserActions.addUser(req.body);
    res.status(200).send({ name: result.name, email: result.email });
  })
);

module.exports = router;
