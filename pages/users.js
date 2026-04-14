global.users = global.users || [];

export default function handler(req, res) {
  res.status(200).json({ users: global.users });
}