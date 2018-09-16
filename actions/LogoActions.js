const Logo = require("./../schema/LogoSchema");
const getImagePath = require("./../helper/GetImagePath");

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
  if (!result) throw new Error("Internal Server Error -500");
  return result;
};

getAllLogos = async () => {
  const queryResult = await Logo.find().populate({
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

getSpecificLogo = async id => {
  const queryResult = await Logo.findById(id).populate({
    path: "author",
    select: { name: 1, email: 1 }
  });
  if (!queryResult) throw new Error("logo Not Found -404");
  queryResult.image = getImagePath(queryResult.image);
  return queryResult;
};

updateLogo = async (id, params) => {
  const queryResult = await Logo.findById(id);
  if (!queryResult) throw new Error("logo Not Found -404");
  const newLogoObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag
  };
  queryResult.set(newLogoObject);
  const result = await queryResult.save();
  if (!result) throw new Error("Internal Server Error -500");
  return result;
};

module.exports.addLogo = addLogo;
module.exports.getAllLogos = getAllLogos;
module.exports.getSpecificLogo = getSpecificLogo;
module.exports.updateLogo = updateLogo;
