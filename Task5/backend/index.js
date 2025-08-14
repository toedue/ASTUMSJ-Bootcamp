const { port, appName } = require("./config/env");
const express = require("express");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send(`${appName} is running...`);
});

app.listen(port, () => {
  console.log(`${appName} is running on port ${port}`);
});
