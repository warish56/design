const Pamplet = require("./../schema/PampletsSchema");
const validateId = require("./../helper/ValidateId");

addPamplet = async params => {
  const dataObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag
  };
  const pamplet = new Pamplet(dataObject);
  const result = await pamplet.save();
  return result;
};

getAllPamplets = async () => {
  const queryResult = await Pamplet.find().populate("author");
  if (queryResult.length !== 0) {
    return queryResult;
  } else {
    return 0;
  }
};

getSpecificPamplet = async id => {
  if (!validateId(id)) return 0;
  const queryResult = await Pamplet.findById(id).populate("author");
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
