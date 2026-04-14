import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("mydb");
    const users = db.collection("users");

    const allUsers = await users.find().toArray();

    res.status(200).json({ users: allUsers });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}