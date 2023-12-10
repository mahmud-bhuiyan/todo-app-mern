const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const notFound = require("./middlewares/notFound");
const customErrorHandler = require("./middlewares/customErrorHandler");

require("dotenv").config();
require("./db/connect");
const port = process.env.PORT || 3001;

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// static file path
app.use(express.static("./public"));

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

// health route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "SJI - Task Manager API is running",
  });
});

app.listen(port, () => {
  console.log(`Task Manager app listening on port ${port}`);
});

app.use(notFound);
app.use(customErrorHandler);
