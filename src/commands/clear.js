module.exports = (bot, msg, userStates) => {
  const chatId = msg.chat.id;

  delete userStates[chatId];

  bot.sendMessage(chatId, '🧹 Chat cleared. You can start fresh now.');
};