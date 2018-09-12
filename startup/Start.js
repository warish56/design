const mongoose = require("mongoose");
const express = require("express");
const app = express();

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

startListeningToRoutes = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listning to port ${port}`);
  });
};

listenToDifferentRoutes = () => {
  app.use("/logo", LogoRouter);
  app.use("/author", AuthorRouter);
  app.use("/poster", PosterRouter);
  app.use("/pamplet", PampletRouter);
  app.use("/certificate", CertificateRouter);
  app.use("/cheque", ChequeRouter);

  //  Handelling Error At Last Stage
  app.use((err, req, res, next) => {
    res.status(500).send(err);
  });
};

applyMiddelware = () => {
  app.use(express.json());
};

module.exports.connectToMongoDb = connectToMongoDb;
module.exports.startListeningToRoutes = startListeningToRoutes;
module.exports.listenToDifferentRoutes = listenToDifferentRoutes;
module.exports.applyMiddelware = applyMiddelware;
