const Pamplet = require("./../schema/PampletsSchema");
const validateId = require("./../helper/ValidateId");
const getImagePath = require("./../helper/GetPath");

addPamplet = async (params, file) => {
  const dataObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag,
    image: file.path
  };
  if (dataObject.likes) dataObject.likes = params.likes;
  const pamplet = new Pamplet(dataObject);
  const result = await pamplet.save();
  return result;
};

getAllPamplets = async () => {
  const queryResult = await Pamplet.find().populate("author");
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

getSpecificPamplet = async id => {
  if (!validateId(id)) return 0;
  const queryResult = await Pamplet.findById(id).populate("author");
  queryResult.image = getImagePath(queryResult.image);
  if (queryResult) return queryResult;
  else return 0;
};

updatePamplet = async (id, params) => {
  if (!validateId(id)) return 0;
  const queryResult = await Pamplet.findById(id);
  if (!queryResult) return 0;
  const newPampletObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag
  };
  queryResult.set(newPampletObject);
  const result = await queryResult.save();
  return result;
};

module.exports.addPamplet = addPamplet;
module.exports.getAllPamplets = getAllPamplets;
module.exports.getSpecificPamplet = getSpecificPamplet;
module.exports.updatePamplet = updatePamplet;
