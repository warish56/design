const Logo = require("./../schema/LogoSchema");
const validateId = require('./../helper/ValidateId');

addLogo = async params => {
  const dataObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag
  };
  const logo = new Logo(dataObject);
  const result = await logo.save();
  return result;
};

getAllLogos = async () => {
  const queryResult = await Logo.find().populate("author");
  if (queryResult.length !== 0) {
    return queryResult;
  } else {
    return 0;
  }
};

getSpecificLogo = async id => {
  if(!validateId(id))
  return 0;
  const queryResult = await Logo.findById(id).populate("author");
  if (queryResult) return queryResult;
  else return 0;
};

updateLogo = async (id, params) => {
  if(!validateId(id))
  return 0;
  const queryResult = await Logo.findById(id);
  if (!queryResult) return 0;
  const newLogoObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag
  };
  queryResult.set(newLogoObject);
  const result = await queryResult.save();
  return result;
};

module.exports.addLogo = addLogo;
module.exports.getAllLogos = getAllLogos;
module.exports.getSpecificLogo = getSpecificLogo;
module.exports.updateLogo = updateLogo;
