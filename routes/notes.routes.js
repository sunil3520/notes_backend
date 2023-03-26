const express = require("express");
const jwt = require("jsonwebtoken");

const notesRoutes = express.Router();
const { NoteModel } = require("../models/notes.models");

notesRoutes.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");
  try {
    if (decoded) {
      const notes = await NoteModel.find({ userId: decoded.userId });
      res.status(200).send({ notes });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

notesRoutes.post("/add", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "Note has been added" });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

notesRoutes.patch("/update/:noteID", async (req, res) => {
  const token = req.headers.authorization;
  const payload = req.body;
  const { noteID } = req.params;
  const decoded = jwt.verify(token, "masai");
  const userId = decoded.userId;
  const singleNote = await NoteModel.findOne({ _id: noteID });

  const userIdInNote = singleNote.userId;
  try {
    if (userId === userIdInNote) {
      await NoteModel.findByIdAndUpdate({ _id: noteID }, payload);
      res.status(200).send({ msg: "Notes has been updated" });
    } else {
      res.status(400).send({ msg: "User not authorized" });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

notesRoutes.delete("/delete/:noteID", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");
  const { noteID } = req.params;
  const userId = decoded.userId;
  const note = await NoteModel.findOne({ _id: noteID });
  const userIdInNote = note.userId;
  console.log(decoded);
  try {
    if (userId === userIdInNote) {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res.status(200).send({ msg: "Notes has been deleted" });
    } else {
      res.status(400).send({ msg: "User not authorized" });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = { notesRoutes };
