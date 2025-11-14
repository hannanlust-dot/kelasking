export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { text, chatId } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing text" });
    }

    const BOT_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = chatId || process.env.CHAT_ID;

    const sendUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(sendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "Markdown"
      })
    });

    const data = await response.json();
    return res.status(200).json({ ok: true, telegram: data });

  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
