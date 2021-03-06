const express = require("express");
const router = express.Router();
const PosterActions = require("./../actions/PosterActions");
const HandleError = require("./../errors/HandleErrors");

router.post(
  "/",
  HandleError(async (req, res) => {
    const result = await PosterActions.addPoster(req.body);
    res.status(200).send(result);
  })
);

router.get(
  "/",
  HandleError(async (req, res) => {
    const result = await PosterActions.getAllPosters();
    if (result) res.status(200).send(result);
    else res.status(404).send("Poster database is empty");
  })
);

router.get(
  "/:id",
  HandleError(async (req, res) => {
    const result = await PosterActions.getSpecificPoster(req.params.id);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Poster with ID: ${req.params.id} Not Found`);
  })
);

router.patch(
  "/:id",
  HandleError(async (req, res) => {
    const result = await PosterActions.updatePoster(req.params.id, req.body);
    if (result) res.status(200).send(result);
    else res.status(404).send(`Poster with ID: ${req.params.id} Not Found`);
  })
);

module.exports = router;
