const Cheque = require("./../schema/ChequeSchema");
const getImagePath = require("./../helper/GetImagePath");

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
  if (!result) throw new Error("Internal Server Error -500");
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
  }
  return queryResult;
};

getSpecificCheque = async id => {
  const queryResult = await Cheque.findById(id).populate({
    path: "author",
    select: { name: 1, email: 1 }
  });
  if (!queryResult) throw new Error("Cheque Not Found -404");
  queryResult.image = getImagePath(queryResult.image);
  return queryResult;
};

updateCheque = async (id, params) => {
  const queryResult = await Cheque.findById(id);
  if (!queryResult) throw new Error("Cheque Not Found -404");
  const newChequeObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag
  };
  queryResult.set(newChequeObject);
  const result = await queryResult.save();
  if (!result) throw new Error("Internal Server Error -500");
  return result;
};

module.exports.addCheque = addCheque;
module.exports.getAllCheques = getAllCheques;
module.exports.getSpecificCheque = getSpecificCheque;
module.exports.updateCheque = updateCheque;
