const router = require("express").Router();
const userCtrl = require("../controller/UserLoginController");
const auth = require("../middleware/auth");

// User Authentication
router.post("/signup", userCtrl.userSignup);
router.post("/login", userCtrl.userLogin);
router.get("/count", userCtrl.countUsers);

// User List & Search
router.get("/getall", userCtrl.getUsers);
router.get("/search", userCtrl.searchUsers);

// User Update
router.put("/:id", userCtrl.updateUser);

// Admin Routes (Protected)
router.get("/users", auth, userCtrl.getAllUsers);
router.get("/users/:id", auth, userCtrl.getUserById);
router.delete("/user/:id", auth, userCtrl.deleteUser);

module.exports = router;
