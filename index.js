const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 *
 * @param {String | Buffer} password the password to be encrypted
 * @returns A promise to be either resolved by the encrypted password or or rejected with an error
 */

const getHashPassword = async (password) => {
  try {
    let encryptedPassword = await bcrypt.hash(password, 10);

    return Promise.resolve(encryptedPassword);
  } catch (err) {
    return Promise.reject(new Error("Password required"));
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
  try {
    const isValid = await bcrypt.compare(inputPassword, encryptedPassword);

    if (isValid) {
      const token = jwt.sign({ ID: userId }, secretKey, { expiresIn: "2h" });

      return Promise.resolve(token);
    } else {
      return Promise.reject(new Error("password don't match"));
    }
  } catch (err) {
    return Promise.reject(err);
  }
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
