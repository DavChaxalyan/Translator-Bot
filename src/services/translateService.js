const translate = require('google-translate-api-x');
const { LANGUAGES } = require('../utils/languageOptions');

async function translateAndReply(bot, chatId, text, targetLang) {
  if (!text || text.trim().length === 0) {
    return bot.sendMessage(chatId, 'Please send a non-empty text to translate.');
  }

  try {
    const res = await translate(text, { to: targetLang });

    const sourceLang = res.from.language.iso;

    bot.sendMessage(
      chatId,
      `🔄 Translation (${LANGUAGES[sourceLang] || 'auto'} → ${LANGUAGES[targetLang]}):\n\n${res.text}`
    );
  } catch (err) {
    console.error('Translation error:', err);
    bot.sendMessage(chatId, 'Translation failed, please try again later.');
  }
}

module.exports = { translateAndReply };