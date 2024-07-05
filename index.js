const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getHashPassword = async (password) => {
  let hashPassord;

  try {
    hashPassord = await bcrypt.hash(password, 10);
    return hashPassord;
  } catch (err) {
    return new Error("password required");
  }
};

const getToken = async (userId, hashPassord, inputPassword, secretKey) => {
  try {
    const result = await bcrypt.compare(inputPassword, hashPassord);

    if (result) {
      const token = jwt.sign({ ID: userId }, secretKey, { expiresIn: "30m" });

      return token;
    }
  } catch (err) {
    return err;
  }
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    req.ID = decodedToken.ID;
    next();
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports = {
  getHashPassword,
  getToken,
  verifyToken,
};
