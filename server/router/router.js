const router = require("express").Router();
const { signUpControl } = require("../controller/signupcontrol");
const { signUpParam, loginParam } = require("../middlewares/validation");
const { logincontrol } = require("../controller/logincontrol");

router.post("/user/signup", signUpParam, signUpControl);
router.post("/user/login", loginParam, logincontrol);
module.exports = router;
