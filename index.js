const { Telegraf } = require('telegraf')
// npm run dev
require('dotenv').config()//1
//const text = require('./const')
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привіт ${ctx.message.from.first_name, 'Я чат-бот створенний щоб показувати курс валют на данний момент'}`))
bot.help((ctx) => ctx.reply('Idk what is'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.launch()