const Poster = require("./../schema/PostersSchema");
const validateId = require("./../helper/ValidateId");

addPoster = async params => {
  const dataObject = {
    name: params.name,
    description: params.description,
    author: params.author,
    tag: params.tag
  };
  const poster = new Poster(dataObject);
  const result = await poster.save();
  return result;
};

getAllPosters = async () => {
  const queryResult = await Poster.find().populate("author");
  if (queryResult.length !== 0) {
    return queryResult;
  } else {
    return 0;
  }
};

getSpecificPoster = async id => {
  if (!validateId(id)) return 0;
  const queryResult = await Poster.findById(id).populate("author");
  if (queryResult) return queryResult;
  else return 0;
};

updatePoster = async (id, params) => {
  if (!validateId(id)) return 0;
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
