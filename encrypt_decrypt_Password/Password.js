const bcrypt = require("bcrypt");

getHashedPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

verifyHashedPassword = async (
  originalPassword_sent_by_client,
  storedHashedPassword
) => {
  const result = await bcrypt.compare(
    originalPassword_sent_by_client,
    storedHashedPassword
  );
  return result;
};

module.exports.getHashedPassword = getHashedPassword;
module.exports.verifyHashedPassword = verifyHashedPassword;
