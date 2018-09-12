const Cheque = require("./../schema/ChequeSchema");
const validateId = require("./../helper/ValidateId");

addCheque = async params => {
  const dataObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag
  };
  const cheque = new Cheque(dataObject);
  const result = await cheque.save();
  return result;
};

getAllCheques = async () => {
  const queryResult = await Cheque.find().populate("author");
  if (queryResult.length !== 0) {
    return queryResult;
  } else {
    return 0;
  }
};

getSpecificCheque = async id => {
  if (!validateId(id)) return 0;
  const queryResult = await Cheque.findById(id).populate("author");
  if (queryResult) return queryResult;
  else return 0;
};

updateCheque = async (id, params) => {
  if (!validateId(id)) return 0;
  const queryResult = await Cheque.findById(id);
  if (!queryResult) return 0;
  const newChequeObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag
  };
  queryResult.set(newChequeObject);
  const result = await queryResult.save();
  return result;
};

module.exports.addCheque = addCheque;
module.exports.getAllCheques = getAllCheques;
module.exports.getSpecificCheque = getSpecificCheque;
module.exports.updateCheque = updateCheque;
