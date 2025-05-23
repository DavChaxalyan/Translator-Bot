require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const startCommand = require('./commands/start');
const cancelCommand = require('./commands/cancel');
const helpCommand = require('./commands/help');
const clearCommand = require('./commands/clear');
const { translateAndReply } = require('./services/translateService');
const { keyboard } = require('./utils/languageOptions');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const userStates = {};

bot.onText(/\/help/, (msg) => helpCommand(bot, msg));

bot.onText(/\/start/, (msg) => startCommand(bot, msg));

bot.onText(/\/reset|очистить/i, (msg) => {clearCommand(bot, msg, userStates)});

bot.onText(/\/cancel|отмена/i, (msg) => { cancelCommand(bot, msg)});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (!userStates[chatId]?.greeted) {
    userStates[chatId] = { greeted: true };
    const welcomeMessage = `
👋 *Hello, ${msg.from.first_name}!*

Welcome to *TranslatorBot* 🌍 — your assistant for fast and easy translations.

✨ Here's what I can do:
- Translate your text to the language you choose
- Support dozens of languages
- Help you with commands like /start, /help, /cancel

📥 Just send me any text, and I'll translate it for you!

To get started, please select the target language from the keyboard below 👇
    `;

    bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });

    return;
  }

  if (msg.text && !msg.text.startsWith('/')) {
    userStates[chatId].text = msg.text;

    bot.sendMessage(chatId, '🌐 Please select the language you want to translate to:', {
      reply_markup: { inline_keyboard: keyboard }
    });
  }
});

bot.setMyCommands([
  { command: '/start', description: 'Start the bot' },
  { command: '/cancel', description: 'Cancel current translation' },
  { command: '/help', description: 'Show help message' },
  { command: '/reset', description: 'Start over' }
]);

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const targetLang = query.data;
  const originalText = userStates[chatId]?.text;

  if (!originalText) {
    return bot.sendMessage(chatId, '❗ No text found to translate.');
  }

  await translateAndReply(bot, chatId, originalText, targetLang);
});

