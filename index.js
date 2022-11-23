const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  port: 6559,
  database: "railway",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  //console.log("MySql Connected");
});

app.get("/api/createCounsellor", (req, res) => {
  let sql =
    "CREATE TABLE counsellor(id int , name VARCHAR(255) not null, mobile VARCHAR(10) not null, yearIn VARCHAR(15) not null, photo LONGTEXT not null, PRIMARY KEY(id))";
  db.query(sql, (err) => {
    if (err) {
      res.send("Counsellor table created already");
    } else {
      res.send("Counsellor table created");
    }
  });
});

app.post("/api/counsellor", (req, res) => {
  id = req.body.id;
  name = req.body.name;
  mobile = req.body.mobile;
  photo = req.body.photo;
  yearIn = req.body.yearIn;
  let post = {
    id: id,
    name: name,
    mobile: mobile,
    photo: photo,
    yearIn: yearIn,
  };

  let sql = "INSERT INTO counsellor SET ?";

  let query = db.query(sql, post, (err) => {
    if (err) {
      res.send("404! Duplicate value");
    } else {
      res.send("Inserted");
    }
  });
});

app.get("/api/counsellor", (req, res) => {
  let sql = "select * from counsellor";
  let query = db.query(sql, (err, data) => {
    if (err) {
      res.send("Error");
    } else {
      res.send(data);
    }
  });
});

app.get("/api/counsellor/:id", (req, res) => {
  let id = req.params.id;
  let sql = `select * from counsellor where id=${id}`;
  let query = db.query(sql, (err, data) => {
    if (err) {
      res.send("Error");
    } else {
      res.send(data);
    }
  });
});

app.get("/api/createParent", (req, res) => {
  let sql1 =
    "CREATE TABLE parents(id varchar(10), name VARCHAR(255) not null, mobile VARCHAR(10) not null, PRIMARY KEY(id))";
  db.query(sql1, (err) => {
    if (err) {
      res.send("Parent table created already");
    } else {
      res.send("Parent table created");
    }
  });
});

app.post("/api/parent", (req, res) => {
  id = req.body.id;
  name = req.body.name;
  mobile = req.body.mobile;

  let post = {
    id: id,
    name: name,
    mobile: mobile,
  };

  let sql = "INSERT INTO parents SET ?";

  let query = db.query(sql, post, (err) => {
    if (err) {
      res.send("Error");
    } else {
      res.send("Inserted parents");
    }
  });
});

app.get("/api/parent", (req, res) => {
  let sql = "select * from parents";
  let query = db.query(sql, (err, data) => {
    if (err) {
      res.send("Error");
    } else {
      res.send(data);
    }
  });
});

app.get("/api/parent/:id", (req, res) => {
  let id = req.params.id;
  let sql = `select * from parents where id=${id}`;
  let query = db.query(sql, (err, data) => {
    if (err) {
      res.send("Error");
    } else {
      res.send(data);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
