const express = require("express");
const noteModel = require("./models/note.model.js");

const app = express();
app.use(express.json());

// const notes = [];

app.post("/notes", async (req, res) => {
  // notes.push(req.body);
  const data = req.body;
  await noteModel.create({
    title: data.title,
    description: data.description,
  });

  return res.status(201).json({
    message: "Note created successfully",
  });
});

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();
  // const notes = await noteModel.findOne({
  //   title: "NT1",
  // });
  return res.status(200).json({
    Message: "Notes fetched successfully",
    notes,
  });
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  // delete notes[index];
  await noteModel.findOneAndDelete({ _id: id });
  return res.status(200).json({
    message: "Note deleted successfully",
  });
});

app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  // notes[index].description = description;
  await noteModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      description,
    },
  );

  res.status(200).json({
    message: "Note updated successfully",
  });
});

module.exports = app;
