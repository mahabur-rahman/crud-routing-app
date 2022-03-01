const express = require("express");
const app = express();
const router = require("./routes/route");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", (req, res) => {
  res.end("Home Page");
});

// listen app
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
