global.users = global.users || [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { address } = req.body;

    if (!global.users.includes(address)) {
      global.users.push(address);
    }

    res.status(200).json({ success: true });
  }
}