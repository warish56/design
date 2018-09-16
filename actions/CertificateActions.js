const Certificate = require("./../schema/CertificatesSchema");
const getImagePath = require("./../helper/GetPath");

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
    return queryResult;
  } else {
    return 0;
  }
};

getSpecificCertificate = async id => {
  const queryResult = await Certificate.findById(id).populate({
    path: "author",
    select: { name: 1, email: 1 }
  });
  queryResult.image = getImagePath(queryResult.image);
  if (queryResult) return queryResult;
  else return 0;
};

updateCertificate = async (id, params) => {
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
