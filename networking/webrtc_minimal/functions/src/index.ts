import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {strict as assert} from "node:assert";
import * as dotenv from "dotenv";
dotenv.config();

// FUNCTION_NAME exists only in deployment, if dev use .env
const key = process.env.FUNCTION_NAME ?
  functions.config().secrets.PRIVATE_KEY_JSON :
  process.env.PRIVATE_KEY_JSON;

assert(key);
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(key)),
});
const firestore = admin.firestore();

export const helloWorld = functions
    .region("asia-southeast1")
    .runWith({memory: "128MB"})
    .https.onRequest((req, res) => {
      res.send(`Hello ${req.query.name || req.body.name || "World"}!`);

      firestore.collection("test").doc("2").update({
        name: "V2 eiei",
        age: 22,
      });
    });

export const host = functions
    .region("asia-southeast1")
    .runWith({memory: "128MB"})
    .https.onRequest((req, res) => {
      res.send(`Hello ${req.query.name || req.body.name || "World"}!`);

      firestore.collection("test").doc("2").update({
        name: "V2 eiei",
        age: 22,
      });
    });
