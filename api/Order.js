const express = require("express");
const router = express.Router();
const HandleError = require("./../handleError/HandleErrors");
const OrderActions = require("./../actions/OrderActions");
const validateOrder = require("./../validators/validateOrder");
const validateMongooseId = require("./../validators/validateMongooseId");
const AuthActions = require("./../actions/AuthActions");

router.post(
  "/",
  AuthActions.validateUserToken(),
  validateOrder(),
  HandleError(async (req, res) => {
    const result = await OrderActions.addOrder(req.body);
    res.status(200).send(result);
  })
);

router.get(
  "/",
  AuthActions.validateAdminToken(),
  HandleError(async (req, res) => {
    const result = await OrderActions.getOrders();
    res.status(200).send(result);
  })
);

router.get(
  "/:id",
  AuthActions.validateAdminToken(),
  validateMongooseId(),
  HandleError(async (req, res) => {
    const result = await OrderActions.getSpecificOrder(req.params.id);
    res.status(200).send(result);
  })
);

module.exports = router;
