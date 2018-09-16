const express = require("express");
const router = express.Router();
const Storage = require("./../multer/Storage");
const PosterActions = require("./../actions/PosterActions");
const HandleError = require("./../handleError/HandleErrors");
const AuthActions = require("./../actions/AuthActions");
const validateDesignes = require("./../validators/validateDesignes");
const validateMongooseId = require("./../validators/validateMongooseId");

const upload = Storage.posterImageStorage();

//  route for adding a new Poster
router.post(
  "/",
  AuthActions.validateToken(),
  upload.single("image"),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await PosterActions.addPoster(req.body, req.file);
    res.status(200).send(result);
  })
);

//  route for getting all the Posters
router.get(
  "/",
  HandleError(async (req, res) => {
    const result = await PosterActions.getAllPosters();
    res.status(200).send(result);
  })
);

//  route for getting a specific Poster
router.get(
  "/:id",
  validateMongooseId(),
  HandleError(async (req, res) => {
    const result = await PosterActions.getSpecificPoster(req.params.id);
    res.status(200).send(result);
  })
);

//  route for updating a Poster
router.patch(
  "/:id",
  AuthActions.validateToken(),
  validateMongooseId(),
  validateDesignes(),
  HandleError(async (req, res) => {
    const result = await PosterActions.updatePoster(req.params.id, req.body);
    res.status(200).send(result);
  })
);

module.exports = router;
