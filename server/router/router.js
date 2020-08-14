const router = require("express").Router();
const { signUpControl } = require("../controller/signupcontrol");
const {
  signUpParam,
  loginParam,
  recoveryParam,
} = require("../middlewares/validation");
const { logincontrol } = require("../controller/logincontrol");
const { getRecoveryCode } = require("../controller/recoveryControl");

router.post("/user/signup", signUpParam, signUpControl);
router.post("/user/login", loginParam, logincontrol);
router.post("/user/recoveryPassword", recoveryParam, getRecoveryCode);
module.exports = router;
