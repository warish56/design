const express = require("express");
const router = express.Router();
const Storage = require("./../multer/Storage");
const ChequeActions = require("./../actions/ChequeActions");
const HandleError = require("./../errors/HandleErrors");
const AuthActions = require("./../actions/AuthActions");
const validateDesignes = require("./../validators/validateDesignes");

const upload = Storage.chequeImageStorage();

router.post(
  "/",
  AuthActions.validateToken(),
  upload.single("image"),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await ChequeActions.addCheque(req.body, req.file);
    res.status(200).send(result);
  })
);

router.get(
  "/",
  HandleError(async (req, res) => {
    const result = await ChequeActions.getAllCheques();
    if (result) res.status(200).send(result);
    else res.status(404).send("Cheque database is empty");
  })
);

router.get(
  "/:id",
  HandleError(async (req, res) => {
    const result = await ChequeActions.getSpecificCheque(req.params.id);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Cheque with ID: ${req.params.id} Not Found`);
  })
);

router.patch(
  "/:id",
  AuthActions.validateToken(),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await ChequeActions.updateCheque(req.params.id, req.body);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Cheque with ID: ${req.params.id} Not Found`);
  })
);

module.exports = router;
