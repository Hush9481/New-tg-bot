const { Telegraf } = require('telegraf')
// npm run dev
const axios = require('axios')
require('dotenv').config()//1
//const text = require('./const')
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привіт ${ctx.message.from.first_name, 'Я чат-бот створенний щоб показувати курс валют на данний момент'}`))
bot.help((ctx) => ctx.reply('Idk what is'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', async (ctx) => {
   try {
      const currencyObj = await axios.get('https://api.monobank.ua/bank/currency')
      return ctx.reply(currencyObj.data[0]);
   } catch (error) {
      return ctx.reply(error)
   }
});
bot.launch()