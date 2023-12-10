const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  addTask,
  getUserTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/taskController");

router.route("/").post(auth, addTask).get(auth, getUserTasks);

router
  .route("/:id")
  .get(auth, getTaskById)
  .patch(auth, updateTaskById)
  .delete(auth, deleteTaskById);

module.exports = router;
