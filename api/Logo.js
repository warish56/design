const express = require("express");
const router = express.Router();
const Storage = require("./../multer/Storage");
const LogoActions = require("./../actions/LogoActions");
const HandleError = require("./../handleError/HandleErrors");
const AuthActions = require("./../actions/AuthActions");
const validateDesignes = require("./../validators/validateDesignes");
const validateMongooseId = require("./../validators/validateMongooseId");

const upload = Storage.logoImageStorage();

//  route for adding a new Logo
router.post(
  "/",
  AuthActions.validateAuthorToken(),
  upload.single("image"),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await LogoActions.addLogo(req.body, req.file);
    res.status(200).send(result);
  })
);

//  route for getting all the Logos
router.get(
  "/",
  HandleError(async (req, res) => {
    const result = await LogoActions.getAllLogos();
    res.status(200).send(result);
  })
);

//  route for getting a specific logo
router.get(
  "/:id",
  validateMongooseId(),
  HandleError(async (req, res) => {
    const result = await LogoActions.getSpecificLogo(req.params.id);
    res.status(200).send(result);
  })
);

// route for updating a logo
router.patch(
  "/:id",
  AuthActions.validateAuthorToken(),
  validateMongooseId(),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await LogoActions.updateLogo(req.params.id, req.body);
    res.status(200).send(result);
  })
);

module.exports = router;
