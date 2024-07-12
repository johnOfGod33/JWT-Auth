const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 *
 * @param {String | Number} password the password to be encrypted
 * @returns A promise to be either resolved by the encrypted password or or rejected with an error
 */

const getHashPassword = async (password) => {
  let encryptedPassword;

  try {
    encryptedPassword = bcrypt.hash(password, 10);
    return encryptedPassword;
  } catch (err) {
    return new Error("password required");
  }
};

/**
 *Compare password and create token
 * @param {String} encryptedPassword your encryptedPassword. it will be compare with input password
 * @param {String} inputPassword password input
 * @param {String | Number} userId user id will be use to create token if input password and encrypted password match
 * @param {String} secretKey Secret key will be use to encrypted the token
 * @returns
 */
const authentification = async (
  encryptedPassword,
  inputPassword,
  userId,
  secretKey
) => {
  const isValid = await bcrypt.compare(inputPassword, encryptedPassword);

  if (isValid) {
    const token = jwt.sign({ ID: userId }, secretKey, { expiresIn: "2h" });

    return token;
  }

  return new Error("password don't match");
};

/**
 * Intercept request and verify the token
 */

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
  authentification,
  verifyToken,
};
