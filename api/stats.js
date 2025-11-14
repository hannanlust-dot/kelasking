let lastCommand = null;

export default function handler(req, res) {
  try {
    // === TERIMA COMMAND DARI TELEGRAM ===
    if (req.method === "POST") {
      lastCommand = req.body || {};
      return res.status(200).json({ message: "Command received" });
    }

    // === DIAMBIL OLEH ROBLOX ===
    if (req.method === "GET") {
      const cmd = lastCommand;
      lastCommand = null; // biar command cuma sekali
      return res.status(200).json(cmd || {});
    }

    return res.status(405).end(); // method ga diperbolehkan
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
