const express = require("express");
const router = express.Router();
const Storage = require("./../multer/Storage");
const CertificateActions = require("./../actions/CertificateActions");
const HandleError = require("./../handleError/HandleErrors");
const AuthActions = require("./../actions/AuthActions");
const validateDesignes = require("./../validators/validateDesignes");
const validateMongooseId = require("./../validators/validateMongooseId");

const upload = Storage.certificateImageStorage();

//  route for adding new certificate
router.post(
  "/",
  AuthActions.validateAuthorToken(),
  upload.single("image"),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await CertificateActions.addCertificate(req.body, req.file);
    res.status(200).send(result);
  })
);

//  route to get all the certificates
router.get(
  "/",
  HandleError(async (req, res) => {
    const result = await CertificateActions.getAllCertificates();
    res.status(200).send(result);
  })
);

//  route to get a specific certificate
router.get(
  "/:id",
  validateMongooseId(),
  HandleError(async (req, res) => {
    const result = await CertificateActions.getSpecificCertificate(
      req.params.id
    );
    res.status(200).send(result);
  })
);

//  route forupdating certificate
router.patch(
  "/:id",
  AuthActions.validateAuthorToken(),
  validateMongooseId(),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await CertificateActions.updateCertificate(
      req.params.id,
      req.body
    );
    res.status(200).send(result);
  })
);

module.exports = router;
