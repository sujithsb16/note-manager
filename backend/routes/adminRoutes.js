const express = require("express");
const {
  getUsers,
  getUserById,
  DeleteUser,
  UpdateUser,
  CreateUser,
  BlockUser,
} = require("../controllers/adminController");
const adminProtect = require("../middlewares/adminAuthMiddleware");
const router = express.Router();

router.route("/").get(adminProtect, getUsers);
router
  .route("/:id")
  .get(getUserById)
  .delete(adminProtect, DeleteUser)
  .put(adminProtect, UpdateUser)
  .patch(adminProtect, BlockUser);
router.route("/create").post(adminProtect, CreateUser);
module.exports = router;
