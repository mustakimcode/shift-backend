import Shift from "../Models/Shift.js";
import Express from "express";
const shift = Express();

shift.get("/shifts", (req, res) => {
  Shift.find()
    .sort("-date")
    .then((data) => {
      res.send(data);
    });
});
shift.get("/shifts/:id", (req, res) => {
  Shift.findById(req.params.id)
    .sort("-date")
    .then((data) => {
      res.send(data);
    });
});
shift.post("/add", (req, res) => {
  let shift = new Shift({
    shift_user_name: req.body.shift_user_name,
    shift_date: req.body.shift_date,
    shift_start_time: req.body.shift_start_time,
    shift_end_time: req.body.shift_end_time,
    shift_is_published: req.body.shift_is_published,
  });
  shift
    .save()
    .then((shift) => {
      res.status(200).json({ shift: "shift added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("adding new shift failed");
    });
});

shift.put("/add", (req, res) => {
  Shift.findById(req.body._id, function (err, shift) {
    if (!shift) res.status(404).send("data is not found");
    else shift.shift_user_name = req.body.shift_user_name;
    shift.shift_date = req.body.shift_date;
    shift.shift_start_time = req.body.shift_start_time;
    shift.shift_end_time = req.body.shift_end_time;
    shift.shift_is_published = req.body.shift_is_published;
    shift
      .save()
      .then((shift) => {
        res.json("Shift updated!");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});

shift.post("/shift/publish/:id", (req, res) => {
  Shift.findById(req.params.id, function (err, shift) {
    if (!shift) res.status(404).send("data is not found");
    else shift.shift_is_published = true;
    shift
      .save()
      .then((shift) => {
        res.json("Shift published!");
      })
      .catch((err) => {
        res.status(400).send("Publish not possible");
      });
  });
});

shift.delete("/shift/:id", (req, res) => {
  Shift.findById(req.params.id, function (err, shift) {
    if (!shift) res.status(404).send("data is not found");
    else
      shift
        .deleteOne({ name: req.params.id })
        .then((shift) => {
          res.json("Shift deleted!");
        })
        .catch((err) => {
          res.status(400).send("Delete not possible");
        });
  });
});

export default shift;
