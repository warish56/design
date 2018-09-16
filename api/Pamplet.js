const express = require("express");
const router = express.Router();
const Storage = require("./../multer/Storage");
const PampletActions = require("./../actions/PampletActions");
const HandleError = require("./../errors/HandleErrors");
const AuthActions = require("./../actions/AuthActions");
const validateDesignes = require("./../validators/validateDesignes");
const validateMongooseId = require("./../validators/validateMongooseId");

const upload = Storage.pampletImageStorage();

router.post(
  "/",
  AuthActions.validateToken(),
  upload.single("image"),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await PampletActions.addPamplet(req.body, req.file);
    res.status(200).send(result);
  })
);

router.get(
  "/",
  HandleError(async (req, res) => {
    const result = await PampletActions.getAllPamplets();
    if (result) res.status(200).send(result);
    else res.status(404).send("Pamplet database is empty");
  })
);

router.get(
  "/:id",
  validateMongooseId(),
  HandleError(async (req, res) => {
    const result = await PampletActions.getSpecificPamplet(req.params.id);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Pamplet with ID: ${req.params.id} Not Found`);
  })
);

router.patch(
  "/:id",
  AuthActions.validateToken(),
  validateMongooseId(),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await PampletActions.updatePamplet(req.params.id, req.body);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Pamplet with ID: ${req.params.id} Not Found`);
  })
);

module.exports = router;
