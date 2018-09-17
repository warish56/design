const mongoose = require("mongoose");
const express = require("express");
const app = express();
const config = require("config");

const AuthRouter = require("./../api/Auth");
const AuthorRouter = require("./../api/Author");
const UserRouter = require("./../api/User");
const LogoRouter = require("./../api/Logo");
const PosterRouter = require("./../api/Poster");
const ChequeRouter = require("./../api/Cheque");
const PampletRouter = require("./../api/Pamplet");
const CertificateRouter = require("./../api/Certificate");
const OrderRouter = require("./../api/Order");

applyMiddelware = () => {
  app.use(express.json());
  app.use("/logo", express.static("uploads/logoImages"));
  app.use("/poster", express.static("uploads/posterImages"));
  app.use("/pamplet", express.static("uploads/pampletsImages"));
  app.use("/certificate", express.static("uploads/certificateImages"));
  app.use("/cheque", express.static("uploads/chequeImages"));
};

checkEnvironMentVariables = () => {
  if (!config.get("jwtPrivateKey")) {
    console.log("JwtKey not found");
    process.exit(1);
  }

  if (!config.get("emailKey")) {
    console.log("emailKey not found");
    process.exit(1);
  }

  if (!config.get("admin_email")) {
    console.log("admin_email not found");
    process.exit(1);
  }

  if (!config.get("admin_password")) {
    console.log("admin_password not found");
    process.exit(1);
  }
};

connectToMongoDb = () => {
  mongoose
    .connect("mongodb://localhost/design")
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch(() => {
      console.log("could not connect to mongodb");
    });
};

listenToDifferentRoutes = () => {
  app.use("/auth", AuthRouter);
  app.use("/user", UserRouter);
  app.use("/logo", LogoRouter);
  app.use("/author", AuthorRouter);
  app.use("/poster", PosterRouter);
  app.use("/pamplet", PampletRouter);
  app.use("/certificate", CertificateRouter);
  app.use("/cheque", ChequeRouter);
  app.use("/order", OrderRouter);

  //  Handelling Error At Last Stage
  app.use((err, req, res, next) => {
    // console.log(err);
    res.status(err[1]).send(err[0]);
  });
};

startListeningToPort = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listning to port ${port}`);
  });
};

module.exports.connectToMongoDb = connectToMongoDb;
module.exports.startListeningToPort = startListeningToPort;
module.exports.listenToDifferentRoutes = listenToDifferentRoutes;
module.exports.applyMiddelware = applyMiddelware;
module.exports.checkEnvironMentVariables = checkEnvironMentVariables;
