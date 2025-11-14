let lastCommand = null;

export default async function handler(req, res) {
  try {
    // === KALO TELEGRAM NGIRIM COMMAND ===
    if (req.method === "POST") {
      lastCommand = req.body || {};
      return res.status(200).json({ message: "Command received" });
    }

    // === KALO ROBLOX NGAMBIL COMMAND ===
    if (req.method === "GET") {
      const cmd = lastCommand;
      lastCommand = null; // biar cuma sekali
      return res.status(200).json(cmd || {});
    }

    return res.status(405).end();
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
