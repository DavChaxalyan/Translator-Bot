const LANGUAGES = {
  en: '🇬🇧 English',
  ru: '🇷🇺 Russian',
  es: '🇪🇸 Spanish',
  fr: '🇫🇷 French',
  de: '🇩🇪 German'
};

const keyboard = Object.entries(LANGUAGES).map(([code, name]) => [
  { text: name, callback_data: code }
]);

module.exports = {
  LANGUAGES,
  keyboard
};
