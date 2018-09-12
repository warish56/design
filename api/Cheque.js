const express = require("express");
const router = express.Router();
const ChequeActions = require("./../actions/ChequeActions");
const HandleError = require("./../errors/HandleErrors");

router.post(
  "/",
  HandleError(async (req, res) => {
    const result = await ChequeActions.addCheque(req.body);
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
  HandleError(async (req, res) => {
    const result = await ChequeActions.updateCheque(req.params.id, req.body);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Cheque with ID: ${req.params.id} Not Found`);
  })
);

module.exports = router;
