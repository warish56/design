const express = require("express");
const router = express.Router();
const Storage = require("./../multer/Storage");
const LogoActions = require("./../actions/LogoActions");
const HandleError = require("./../errors/HandleErrors");
const AuthActions = require("./../actions/AuthActions");
const validateDesignes = require("./../validators/validateDesignes");
const validateMongooseId = require("./../validators/validateMongooseId");

const upload = Storage.logoImageStorage();
router.post(
  "/",
  AuthActions.validateToken(),
  upload.single("image"),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await LogoActions.addLogo(req.body, req.file);
    res.status(200).send(result);
  })
);

router.get(
  "/",
  HandleError(async (req, res) => {
    const result = await LogoActions.getAllLogos();
    if (result) res.status(200).send(result);
    else res.status(404).send("Logo database is empty");
  })
);

router.get(
  "/:id",
  validateMongooseId(),
  HandleError(async (req, res) => {
    const result = await LogoActions.getSpecificLogo(req.params.id);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Logo with ID: ${req.params.id} Not Found`);
  })
);

router.patch(
  "/:id",
  AuthActions.validateToken(),
  validateMongooseId(),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await LogoActions.updateLogo(req.params.id, req.body);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Logo with ID: ${req.params.id} Not Found`);
  })
);

module.exports = router;
