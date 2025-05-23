module.exports = (bot, msg) => {
  const chatId = msg.chat.id;

  const helpText = `
🧠 *Translator Bot*

Here’s what I can do:

/start — start the bot  
/cancel — cancel the current translation  
/help — show this message  

📥 Just send me any text, and I’ll translate it to the selected language.

🗣 You can specify the language with a command, for example:  
\`/translate en\` — translate to English  
\`/translate ru\` — translate to Russian, etc.

🌐 Supports dozens of languages. Enjoy!
`;

  bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown' });
};
