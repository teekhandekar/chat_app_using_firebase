const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();

admin.initializeApp();

app.use(cors({ origin: true }));

app.post("/messages", async (req, res) => {
  const message = req.body;

  await admin.firestore().collection("messages").add(message);

  res.status(201).send();
});

app.get("/messages", async (req, res) => {
  const snapshot = await admin.firestore().collection("messages").get();

  const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  res.status(200).send(messages);
});

exports.api = functions.https.onRequest(app);
