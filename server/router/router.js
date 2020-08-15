const router = require("express").Router();
const { signUpControl } = require("../controller/signupcontrol");
const {
  signUpParam,
  loginParam,
  recoveryParam,
  resetValidation,
} = require("../middlewares/validation");
const { logincontrol } = require("../controller/logincontrol");
const {
  getRecoveryCode,
  resetPassword,
} = require("../controller/recoveryControl");

router.post("/user/signup", signUpParam, signUpControl);
router.post("/user/login", loginParam, logincontrol);
router.post("/user/recoveryPassword", recoveryParam, getRecoveryCode);
router.post("/user/resetPassword", resetValidation, resetPassword);

module.exports = router;
