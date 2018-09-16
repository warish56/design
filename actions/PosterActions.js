const Poster = require("./../schema/PostersSchema");
const validateId = require("./../helper/ValidateId");
const getImagePath = require("./../helper/GetImagePath");

addPoster = async (params, file) => {
  const dataObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag,
    image: file.path
  };
  if (dataObject.likes) dataObject.likes = params.likes;
  const poster = new Poster(dataObject);
  const result = await poster.save();
  if (!result) throw new Error("Internal Server Error -500");
  return result;
};

getAllPosters = async () => {
  const queryResult = await Poster.find().populate({
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

getSpecificPoster = async id => {
  const queryResult = await Poster.findById(id).populate({
    path: "author",
    select: { name: 1, email: 1 }
  });
  if (!queryResult) throw new Error("Poster Not Found -404");
  queryResult.image = getImagePath(queryResult.image);
  return queryResult;
};

updatePoster = async (id, params) => {
  const queryResult = await Poster.findById(id);
  if (!queryResult) throw new Error("Poster Not Found -404");
  const newPosterObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag
  };
  queryResult.set(newPosterObject);
  const result = await queryResult.save();
  if (!result) throw new Error("Internal Server Error -500");
  return result;
};

module.exports.addPoster = addPoster;
module.exports.getAllPosters = getAllPosters;
module.exports.getSpecificPoster = getSpecificPoster;
module.exports.updatePoster = updatePoster;
