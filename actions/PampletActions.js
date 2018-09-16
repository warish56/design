const Pamplet = require("./../schema/PampletsSchema");
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
  const queryResult = await Pamplet.find().populate({
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

getSpecificPamplet = async id => {
  const queryResult = await Pamplet.findById(id).populate({
    path: "author",
    select: { name: 1, email: 1 }
  });
  queryResult.image = getImagePath(queryResult.image);
  if (queryResult) return queryResult;
  else return 0;
};

updatePamplet = async (id, params) => {
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
