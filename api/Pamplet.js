const express = require("express");
const router = express.Router();
const Storage = require("./../multer/Storage");
const PampletActions = require("./../actions/PampletActions");
const HandleError = require("./../handleError/HandleErrors");
const AuthActions = require("./../actions/AuthActions");
const validateDesignes = require("./../validators/validateDesignes");
const validateMongooseId = require("./../validators/validateMongooseId");

const upload = Storage.pampletImageStorage();

//  route for adding a new Pamplet
router.post(
  "/",
  AuthActions.validateAuthorToken(),
  upload.single("image"),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await PampletActions.addPamplet(req.body, req.file);
    res.status(200).send(result);
  })
);

//  route to get all the Pamplets
router.get(
  "/",
  HandleError(async (req, res) => {
    const result = await PampletActions.getAllPamplets();
    res.status(200).send(result);
  })
);

//  route to get a specific Pamplet
router.get(
  "/:id",
  validateMongooseId(),
  HandleError(async (req, res) => {
    const result = await PampletActions.getSpecificPamplet(req.params.id);
    res.status(200).send(result);
  })
);

// route to update a pamplet
router.patch(
  "/:id",
  AuthActions.validateAuthorToken(),
  validateMongooseId(),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await PampletActions.updatePamplet(req.params.id, req.body);
    res.status(200).send(result);
  })
);

module.exports = router;
