const Cheque = require("./../schema/ChequeSchema");
const getImagePath = require("./../helper/GetPath");

addCheque = async (params, file) => {
  const dataObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag,
    image: file.path
  };
  if (dataObject.likes) dataObject.likes = params.likes;
  const cheque = new Cheque(dataObject);
  const result = await cheque.save();
  return result;
};

getAllCheques = async () => {
  const queryResult = await Cheque.find().populate({
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

getSpecificCheque = async id => {
  const queryResult = await Cheque.findById(id).populate({
    path: "author",
    select: { name: 1, email: 1 }
  });
  queryResult.image = getImagePath(queryResult.image);
  if (queryResult) return queryResult;
  else return 0;
};

updateCheque = async (id, params) => {
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
