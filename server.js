const express = require("express");
const db = require("./db.js");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    await db.query(
      `create table if not exists loginfo (username varchar(255) primary key ,  password varchar(255) not null)`
    );
    res.status(200).send("super da bunda");
  } catch (err) {
    console.log(err);
  }
});

app.post("/signin", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  if (username != "" && password != "") {
    try {
      await db.query("insert into loginfo(username,password) values(?,?)", [
        username,
        password,
      ]);
      res.status(200).send({ LOG: "user created successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error!!");
    }
  } else {
    res.status(400).send("Bad request!!");
  }
});

app.get("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username == "" || password == "") {
    res.status(400).send({ ERR: "Bad request" });
  } else {
    try {
      const [rows] = await db.query(
        "select username , password from loginfo where username=?",
        [username]
      );
      if (rows.length == 0) {
        console.log("No user found!!");
      }
      res.status(200).send({ LOG: "Login Successful!!" });
    } catch (err) {
      console.log({ ERR: `${err}` });
      res.status(500).send({ ERR: "Internal Server Error!!" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server Running successfully in ${PORT}`);
});
