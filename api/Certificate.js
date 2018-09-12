const express = require("express");
const router = express.Router();
const CertificateActions = require("./../actions/CertificateActions");
const HandleError = require("./../errors/HandleErrors");

router.post(
  "/",
  HandleError(async (req, res) => {
    const result = await CertificateActions.addCertificate(req.body);
    res.status(200).send(result);
  })
);

router.get(
  "/",
  HandleError(async (req, res) => {
    const result = await CertificateActions.getAllCertificates();
    if (result) res.status(200).send(result);
    else res.status(404).send("Certificate database is empty");
  })
);

router.get(
  "/:id",
  HandleError(async (req, res) => {
    const result = await CertificateActions.getSpecificCertificate(
      req.params.id
    );
    if (result) res.status(200).send(result);
    else
      res.status(404).send(`Certificate with ID: ${req.params.id} Not Found`);
  })
);

router.patch(
  "/:id",
  HandleError(async (req, res) => {
    const result = await CertificateActions.updateCertificate(
      req.params.id,
      req.body
    );
    if (result) res.status(200).send(result);
    else
      res.status(404).send(`Certificate with ID: ${req.params.id} Not Found`);
  })
);

module.exports = router;
