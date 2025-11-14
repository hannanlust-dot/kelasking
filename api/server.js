bot.on("message", (msg) => {
  const text = msg.text;

  fetch("https://kelasking-alpha.vercel.app/api/server", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cmd: text })
  });

  bot.sendMessage(msg.chat.id, "Command dikirim ke server!");
});
