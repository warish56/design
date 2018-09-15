const mongoose = require("mongoose");
const express = require("express");
const app = express();
const config = require("config");

const AuthRouter = require("./../api/Auth");
const AuthorRouter = require("./../api/Author");
const LogoRouter = require("./../api/Logo");
const PosterRouter = require("./../api/Poster");
const ChequeRouter = require("./../api/Cheque");
const PampletRouter = require("./../api/Pamplet");
const CertificateRouter = require("./../api/Certificate");

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

startListeningToPort = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listning to port ${port}`);
  });
};

listenToDifferentRoutes = () => {
  app.use("/auth", AuthRouter);
  app.use("/logo", LogoRouter);
  app.use("/author", AuthorRouter);
  app.use("/poster", PosterRouter);
  app.use("/pamplet", PampletRouter);
  app.use("/certificate", CertificateRouter);
  app.use("/cheque", ChequeRouter);

  //  Handelling Error At Last Stage
  app.use((err, req, res, next) => {
    // console.log(err);
    res.status(500).send(err);
  });
};

applyMiddelware = () => {
  if (!config.get("jwtPrivateKey")) {
    process.exit(1);
  }
  app.use(express.json());
  app.use("/logo", express.static("uploads/logoImages"));
  app.use("/poster", express.static("uploads/posterImages"));
  app.use("/pamplet", express.static("uploads/pampletsImages"));
  app.use("/certificate", express.static("uploads/certificateImages"));
  app.use("/cheque", express.static("uploads/chequeImages"));
};

module.exports.connectToMongoDb = connectToMongoDb;
module.exports.startListeningToPort = startListeningToPort;
module.exports.listenToDifferentRoutes = listenToDifferentRoutes;
module.exports.applyMiddelware = applyMiddelware;
