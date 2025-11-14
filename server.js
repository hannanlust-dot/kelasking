let lastCommand = null;

export default function handler(req, res) {
  if (req.method === "POST") {
    lastCommand = req.body;  // Simpan command dari Telegram
    return res.status(200).json({ message: "Command received" });
  }

  if (req.method === "GET") {
    const cmd = lastCommand;
    lastCommand = null; // reset biar ga spam
    return res.status(200).json(cmd || {});
  }

  res.status(405).end();
}
