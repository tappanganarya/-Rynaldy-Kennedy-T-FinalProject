const router = require("express").Router();
const UserController = require("../controllers/UserController");

// GET all users
router.get("/", UserController.getAllUsers);

// GET user by id
router.get("/search/:id", UserController.getUserById);

// POST new user
router.post("/add", UserController.createUser);

// PUT update user
router.put("/update/:id", UserController.updateUser);

// DELETE user
router.delete("/delete/:id", UserController.deleteUser);

// Login 
router.post("/login", UserController.login);

module.exports = router;
