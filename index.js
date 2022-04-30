(() => {
  const express = require("express");
  const { createClient } = require("redis");
  require("dotenv").config();
  const { getData, createData } = require("./redis.crud");

  return (() => {
    const app = express();

    app.use(express.json());
    app.get("/", (req, res) => {
      res.send("hello world");
    });
    app.get("/task", async (req, res) => {
      try {
        const task = await getData();
        console.log(JSON.parse(task));

        res.status(200).json({
          tasks: JSON.parse(task),
        });
      } catch (err) {
        res.send(err);
      }
    });
    app.post("/task", async (req, res) => {
      try {
        const task = await createData(JSON.stringify(req.body));

        res.status(200).json({
          task,
        });
      } catch (err) {
        res.send(err);
      }
    });

    const bootstrap = (port) => {
      app.listen(port, () => {
        console.log("Listening to the server on port", port);
      });
    };
    const port = process.env.PORT | 8080;

    bootstrap(port);
  })();
})();
