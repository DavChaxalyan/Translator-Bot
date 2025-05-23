module.exports = async function cancelCommand(bot, msg) {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, '❌ Translation cancelled. You can send a new text.');
};
