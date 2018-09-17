const express = require("express");
const router = express.Router();
const Storage = require("./../multer/Storage");
const ChequeActions = require("./../actions/ChequeActions");
const HandleError = require("./../handleError/HandleErrors");
const AuthActions = require("./../actions/AuthActions");
const validateDesignes = require("./../validators/validateDesignes");
const validateMongooseId = require("./../validators/validateMongooseId");

const upload = Storage.chequeImageStorage();

//  route for adding a new Cheque
router.post(
  "/",
  AuthActions.validateAuthorToken(),
  upload.single("image"),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await ChequeActions.addCheque(req.body, req.file);
    res.status(200).send(result);
  })
);

//  route for getting all Cheques
router.get(
  "/",
  HandleError(async (req, res) => {
    const result = await ChequeActions.getAllCheques();
    res.status(200).send(result);
  })
);

//  route for getting a specific cheque
router.get(
  "/:id",
  validateMongooseId(),
  HandleError(async (req, res) => {
    const result = await ChequeActions.getSpecificCheque(req.params.id);
    res.status(200).send(result);
  })
);

// route for updating a cheque
router.patch(
  "/:id",
  AuthActions.validateAuthorToken(),
  validateMongooseId(),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await ChequeActions.updateCheque(req.params.id, req.body);
    res.status(200).send(result);
  })
);

module.exports = router;
