const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  console.log("hashing password");
  const salt = await bcrypt.genSalt(11);
  return await bcrypt.hash(password, salt);
};
exports.comparePassword = async (password, hashedPassword) => {
  console.log("comparing password");
  return await bcrypt.compare(password, hashedPassword);
};
