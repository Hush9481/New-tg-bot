const { Telegraf, Markup } = require('telegraf')
// npm run dev
const axios = require('axios')
const cc = require('currency-codes');
require('dotenv').config()//1
const bot = new Telegraf('5408260189:AAGZj2StjpUnO5U8ArM5rkApBCXZ1P7Oc7Q')
bot.start((ctx) => ctx.reply(`Привіт ${ctx.message.from.first_name, 'Я чат-бот створенний щоб показувати курс валют на данний момент'}`))
bot.help((ctx) => ctx.reply('Пропишіть команду /what'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears(/^[A-Z]+$/i, async (ctx) => {
   console.log(ctx.message.text);
   const clientCurCode = ctx.message.text;
   const currency = cc.code(clientCurCode);
   if (!currency) {
      return ctx.reply('Валюта не найденна(');
   }
   try {
      const currencyObj = await axios.get('https://api.monobank.ua/bank/currency')
      const foundCurrency = currencyObj.data.find((cur) => {
         return cur.currencyCodeA.toString() === currency.number;
      });
      if (!foundCurrency || !foundCurrency.rateBuy || !foundCurrency.rateSell) {
         return ctx.reply('Валюта не найденна(');
      }
      return ctx.replyWithMarkdown(` 
         Валюта: ${currency.code}
Ціна покупки:*${foundCurrency.rateBuy}*
Ціна продажу:*${foundCurrency.rateSell}*
         `)
   } catch (error) {
      return ctx.reply(error)
   }
});//Markup.button.callback('PLN🇵🇱', 'btn_3')
bot.command('what', (ctx) => {
   ctx.replyWithHTML('<b>Це валюти які я знаю і можу їх перевести у грн напишіть як на кнопках щоби дізнатись курс(поки що мало через не стабільну ситуацію в країні)</b>', Markup.inlineKeyboard(
      [
         [Markup.button.callback('USD🇺🇸', 'btn_1'), Markup.button.callback('EUR🇪🇺', 'btn_2')]
      ]
   ))

})
/*bot.action('btn_1', (ctx) => {
   return ctx.replyWithMarkdown(` 
   Валюта:USD
Ціна покупки:*${currency.rateBuy[0]}*
Ціна продажу:*${currency.rateSell[0]}*
   `)
})
bot.action('btn_2', (ctx) => {
   return ctx.replyWithMarkdown(` 
   Валюта:EUR
Ціна покупки:*${currency.rateBuy[1]}*
Ціна продажу:*${currency.rateSell[1]}*
   `)
})
//bot.action('btn_3', (ctx) => {
//  ctx.reply('Курса поки немає,так як не стабільна ситуація в країні)')
//})*/
bot.launch()