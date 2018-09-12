const express = require("express");
const router = express.Router();
const AuthorActions = require("./../actions/AuthorActions");
const HandleError = require("./../errors/HandleErrors");

router.post(
  "/",
  HandleError(async (req, res) => {
    const result = await AuthorActions.addAuthor(req.body);
    res.status(200).send(result);
  })
);

router.get(
  "/:id",
  HandleError(async (req, res) => {
    const result = await AuthorActions.getAuthor(req.params.id);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Author with ID: ${req.params.id} Not Found`);
  })
);

router.patch(
  "/:id",
  HandleError(async (req, res) => {
    const result = await AuthorActions.updateAuthor(req.params.id, req.body);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Author with ID: ${req.params.id} Not Found`);
  })
);

module.exports = router;
