const Author = require("./../schema/AuthorSchema");
const validateId = require("./../helper/ValidateId");
const Encrypt = require("./../helper/GetHashedPassword");
const SendMail = require("./../email/SendMail");
const Keys = require("./../jwt/Keys");

addAuthor = async params => {
  // create a hashed password
  // send email verification link
  const isAuthorPresent = await Author.findOne({ email: params.email });
  if (isAuthorPresent) return 0;

  const dataObject = {
    name: params.name,
    description: params.description,
    email: params.email,
    phone: params.phone,
    password: await Encrypt.getHashedPassword(params.password)
  };

  // Not required Field checking
  if (params.experience) dataObject.experience = params.experience;
  const author = new Author(dataObject);
  const result = await author.save();
  const successMail = await SendMail(params.email, token);
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
