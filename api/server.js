export default function handler(req, res) {
  try {
    global.lastCommand = global.lastCommand || null;

    if (req.method === "POST") {
      const body = req.body || {};
      global.lastCommand = body;
      return res.status(200).json({ message: "Command received" });
    }

    if (req.method === "GET") {
      const cmd = global.lastCommand;
      global.lastCommand = null;
      return res.status(200).json(cmd || {});
    }

    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
}
