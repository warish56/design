const express = require("express");
const router = express.Router();
const AuthorActions = require("./../actions/AuthorActions");
const HandleError = require("./../errors/HandleErrors");
const AuthActions = require("./../actions/AuthActions");
const validateAuthor = require("./../validators/validateAuthor");
const validateMongooseId = require("./../validators/validateMongooseId");

router.post(
  "/",
  validateAuthor(),
  HandleError(async (req, res) => {
    const result = await AuthorActions.addAuthor(req.body);
    if (!result) return res.status(400).send("Email Alredy registered");
    res.status(200).send(result);
  })
);

router.get(
  "/:id",
  validateMongooseId(),
  HandleError(async (req, res) => {
    const result = await AuthorActions.getAuthor(req.params.id);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Author with ID: ${req.params.id} Not Found`);
  })
);

router.patch(
  "/:id",
  AuthActions.validateToken(),
  validateMongooseId(),
  HandleError(async (req, res) => {
    const result = await AuthorActions.updateAuthor(req.params.id, req.body);
    if (result) res.status(200).send("Author Updated");
    else res.status(404).send(`Author with ID: ${req.params.id} Not Found`);
  })
);

module.exports = router;
