import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db("mydb");
    const users = db.collection("users");

    const allUsers = await users.find().toArray();

    res.status(200).json({ users: allUsers });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}