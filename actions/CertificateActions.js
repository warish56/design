const Certificate = require("./../schema/CertificatesSchema");
const getImagePath = require("./../helper/GetImagePath");

addCertificate = async (params, file) => {
  const dataObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag,
    image: file.path
  };
  if (dataObject.likes) dataObject.likes = params.likes;
  const certificate = new Certificate(dataObject);
  const result = await certificate.save();
  if (!result) throw new Error("Internal Server Error -500");
  return result;
};

getAllCertificates = async () => {
  const queryResult = await Certificate.find().populate({
    path: "author",
    select: { name: 1, email: 1 }
  });
  if (queryResult.length !== 0) {
    //  setting image path
    queryResult.forEach((item, index) => {
      if (item.image) queryResult[index].image = getImagePath(item.image);
    });
  }
  return queryResult;
};

getSpecificCertificate = async id => {
  const queryResult = await Certificate.findById(id).populate({
    path: "author",
    select: { name: 1, email: 1 }
  });
  if (!queryResult) throw new Error("Certificate Not Found -404");
  queryResult.image = getImagePath(queryResult.image);
  return queryResult;
};

updateCertificate = async (id, params) => {
  const queryResult = await Certificate.findById(id);
  if (!queryResult) throw new Error("Certificate Not Found -404");
  const newCertificateObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag
  };
  queryResult.set(newCertificateObject);
  const result = await queryResult.save();
  if (!result) throw new Error("Internal Server Error -500");
  return result;
};

module.exports.addCertificate = addCertificate;
module.exports.getAllCertificates = getAllCertificates;
module.exports.getSpecificCertificate = getSpecificCertificate;
module.exports.updateCertificate = updateCertificate;
