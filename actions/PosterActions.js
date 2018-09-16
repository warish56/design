const Poster = require("./../schema/PostersSchema");
const validateId = require("./../helper/ValidateId");
const getImagePath = require("./../helper/GetPath");

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
    return queryResult;
  } else {
    return 0;
  }
};

getSpecificPoster = async id => {
  const queryResult = await Poster.findById(id).populate({
    path: "author",
    select: { name: 1, email: 1 }
  });
  queryResult.image = getImagePath(queryResult.image);
  if (queryResult) return queryResult;
  else return 0;
};

updatePoster = async (id, params) => {
  const queryResult = await Poster.findById(id);
  if (!queryResult) return 0;
  const newPosterObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag
  };
  queryResult.set(newPosterObject);
  const result = await queryResult.save();
  return result;
};

module.exports.addPoster = addPoster;
module.exports.getAllPosters = getAllPosters;
module.exports.getSpecificPoster = getSpecificPoster;
module.exports.updatePoster = updatePoster;
