export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { chatId, text, button } = req.body;

    const BOT_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = chatId || process.env.CHAT_ID;

    if (!BOT_TOKEN) return res.status(500).json({ error: "Missing TELEGRAM_TOKEN env" });
    if (!CHAT_ID) return res.status(400).json({ error: "Missing chatId" });

    console.log("📌 Sending message to chatId:", CHAT_ID);

    const sendUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    // Jika button diklik, gunakan callback_data sebagai text
    const messageText = button || text || "Pilih command:";

    const payload = {
      chat_id: CHAT_ID,
      text: messageText,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Stats", callback_data: "/cmd stats" },
            { text: "Kill All", callback_data: "/cmd killall" }
          ],
          [
            { text: "Announce", callback_data: "/cmd announce Hello!" },
            { text: "Give Item", callback_data: "/cmd give PlayerName ItemName" }
          ],
          [
            { text: "TP", callback_data: "/cmd tp Player1 Player2" }
          ]
        ]
      }
    };

    const response = await fetch(sendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    // Cek error dari Telegram
    if (!data.ok) {
      console.warn("⚠️ Telegram API error:", data);
    }

    return res.status(200).json({ ok: true, telegram: data });

  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
