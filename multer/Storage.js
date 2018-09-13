const multer = require("multer");
const createId = require("./../helper/CreateId");

logoImageStorage = () => {
  const storage = multer.diskStorage({
    destination: function(req, file, next) {
      next(null, "uploads/logoImages");
    },
    filename: function(req, file, next) {
      next(null, createId() + "." + file.mimetype.split("/")[1]);
    }
  });
  return multer({ storage: storage });
};

posterImageStorage = () => {
  const storage = multer.diskStorage({
    destination: function(req, file, next) {
      next(null, "uploads/posterImages");
    },
    filename: function(req, file, next) {
      next(null, createId() + "." + file.mimetype.split("/")[1]);
    }
  });
  return multer({ storage: storage });
};

pampletImageStorage = () => {
  const storage = multer.diskStorage({
    destination: function(req, file, next) {
      next(null, "uploads/pampletImages");
    },
    filename: function(req, file, next) {
      next(null, createId() + "." + file.mimetype.split("/")[1]);
    }
  });
  return multer({ storage: storage });
};

chequeImageStorage = () => {
  const storage = multer.diskStorage({
    destination: function(req, file, next) {
      next(null, "uploads/chequeImages");
    },
    filename: function(req, file, next) {
      next(null, createId() + "." + file.mimetype.split("/")[1]);
    }
  });
  return multer({ storage: storage });
};

certificateImageStorage = () => {
  const storage = multer.diskStorage({
    destination: function(req, file, next) {
      next(null, "uploads/certificateImages");
    },
    filename: function(req, file, next) {
      next(null, createId() + "." + file.mimetype.split("/")[1]);
    }
  });
  return multer({ storage: storage });
};

module.exports.logoImageStorage = logoImageStorage;
module.exports.posterImageStorage = posterImageStorage;
module.exports.pampletImageStorage = pampletImageStorage;
module.exports.chequeImageStorage = chequeImageStorage;
module.exports.certificateImageStorage = certificateImageStorage;
