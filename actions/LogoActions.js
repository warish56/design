const Logo = require("./../schema/LogoSchema");
const validateId = require("./../helper/ValidateId");
const getImagePath = require("./../helper/GetPath");

addLogo = async (params, file) => {
  const dataObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag,
    image: file.path
  };
  if (dataObject.likes) dataObject.likes = params.likes;
  const logo = new Logo(dataObject);
  const result = await logo.save();
  return result;
};

getAllLogos = async () => {
  const queryResult = await Logo.find().populate("author");
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

getSpecificLogo = async id => {
  if (!validateId(id)) return 0;
  const queryResult = await Logo.findById(id).populate("author");
  queryResult.image = getImagePath(queryResult.image);
  if (queryResult) return queryResult;
  else return 0;
};

updateLogo = async (id, params) => {
  if (!validateId(id)) return 0;
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
