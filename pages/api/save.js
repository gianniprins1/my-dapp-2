import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { address } = req.body;

    try {
      await client.connect();
      const db = client.db("mydb");
      const users = db.collection("users");

      const exists = await users.findOne({ address });

      if (!exists) {
        await users.insertOne({ address });
      }

      res.status(200).json({ success: true });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}