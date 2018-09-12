const Author = require("./../schema/AuthorSchema");
const validateId = require("./../helper/ValidateId");

addAuthor = async params => {
  const dataObject = {
    name: params.name,
    description: params.description,
    phone: params.phone
  };
  const author = new Author(dataObject);
  const result = await author.save();
  return result;
};

getAuthor = async id => {
  if (!validateId(id)) return 0;
  const result = Author.findById(id);
  if (result) return result;
  else return 0;
};

updateAuthor = async (id, params) => {
  if (!validateId(id)) return 0;
  const queryResult = await Author.findById(id);
  if (!queryResult) return 0;
  const newAuthorObject = {
    name: params.name,
    description: params.description,
    phone: params.phone
  };
  queryResult.set(newAuthorObject);
  const result = await queryResult.save();
  return result;
};

module.exports.addAuthor = addAuthor;
module.exports.getAuthor = getAuthor;
module.exports.updateAuthor = updateAuthor;
