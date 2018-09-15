const checkTypeOfToken = token => {
  return (req, res, next) => {
    if (req.params.token.length < 20)
      return res.status(400).send("Invalid Token");
    else next();
  };
};

module.exports = checkTypeOfToken;
