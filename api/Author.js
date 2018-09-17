const express = require("express");
const router = express.Router();
const AuthorActions = require("./../actions/AuthorActions");
const HandleError = require("./../handleError/HandleErrors");
const AuthActions = require("./../actions/AuthActions");
const validateAuthor = require("./../validators/validateAuthor");
const validateMongooseId = require("./../validators/validateMongooseId");

//  route for adding new Author
router.post(
  "/",
  validateAuthor(),
  HandleError(async (req, res) => {
    const result = await AuthorActions.addAuthor(req.body);
    res.status(200).send(result);
  })
);

//  route for getting auhtor of specific ID
router.get(
  "/:id",
  validateMongooseId(),
  HandleError(async (req, res) => {
    const result = await AuthorActions.getAuthor(req.params.id);
    res.status(200).send(result);
  })
);

//  route for updating author
router.patch(
  "/:id",
  AuthActions.validateAuthorToken(),
  validateMongooseId(),
  HandleError(async (req, res) => {
    const result = await AuthorActions.updateAuthor(req.params.id, req.body);
    res.status(200).send("Author Updated");
  })
);

module.exports = router;
