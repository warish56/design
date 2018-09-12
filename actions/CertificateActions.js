const Certificate = require("./../schema/CertificatesSchema");
const validateId = require("./../helper/ValidateId");

addCertificate = async params => {
  const dataObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag
  };
  const certificate = new Certificate(dataObject);
  const result = await certificate.save();
  return result;
};

getAllCertificates = async () => {
  const queryResult = await Certificate.find().populate("author");
  if (queryResult.length !== 0) {
    return queryResult;
  } else {
    return 0;
  }
};

getSpecificCertificate = async id => {
  if (!validateId(id)) return 0;
  const queryResult = await Certificate.findById(id).populate("author");
  if (queryResult) return queryResult;
  else return 0;
};

updateCertificate = async (id, params) => {
  if (!validateId(id)) return 0;
  const queryResult = await Certificate.findById(id);
  if (!queryResult) return 0;
  const newCertificateObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag
  };
  queryResult.set(newCertificateObject);
  const result = await queryResult.save();
  return result;
};

module.exports.addCertificate = addCertificate;
module.exports.getAllCertificates = getAllCertificates;
module.exports.getSpecificCertificate = getSpecificCertificate;
module.exports.updateCertificate = updateCertificate;
