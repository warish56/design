const express = require("express");
const router = express.Router();
const LogoActions = require("./../actions/LogoActions");
const HandleError = require("./../errors/HandleErrors");

router.post(
  "/",
  HandleError(async (req, res) => {
    const result = await LogoActions.addLogo(req.body);
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
  HandleError(async (req, res) => {
    const result = await LogoActions.getSpecificLogo(req.params.id);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Logo with ID: ${req.params.id} Not Found`);
  })
);

router.patch(
  "/:id",
  HandleError(async (req, res) => {
    const result = await LogoActions.updateLogo(req.params.id, req.body);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Logo with ID: ${req.params.id} Not Found`);
  })
);

module.exports = router;
