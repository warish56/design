const express = require("express");
const router = express.Router();
const PampletActions = require("./../actions/PampletActions");
const HandleError = require("./../errors/HandleErrors");

router.post(
  "/",
  HandleError(async (req, res) => {
    const result = await PampletActions.addPamplet(req.body);
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
  HandleError(async (req, res) => {
    const result = await PampletActions.getSpecificPamplet(req.params.id);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Pamplet with ID: ${req.params.id} Not Found`);
  })
);

router.patch(
  "/:id",
  HandleError(async (req, res) => {
    const result = await PampletActions.updatePamplet(req.params.id, req.body);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Pamplet with ID: ${req.params.id} Not Found`);
  })
);

module.exports = router;
