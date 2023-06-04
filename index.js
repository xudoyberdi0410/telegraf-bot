const {
    Telegraf,
    Input
} = require('telegraf');
const {
    message
} = require('telegraf/filters');
require('dotenv').config()
const tt = require('./tt')

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Отправьте ссылку на видео и я отправлю его без водяного знака"));
bot.help((ctx) => ctx.reply("Отправьте ссылку на видео и я отправлю его без водяного знака"));

bot.on(message('text'), async (ctx) => {
    try {
        let entities = await ctx.message.entities
        if (!entities) {
            return
        }
        let urls = entities.filter(obj => obj['type'] == 'url')
        if (!urls) {
            return
        }

        const url = await ctx.message.text.slice(urls[0]['offset'], parseInt(urls[0]['length']) + parseInt(urls[0]['offset']))
        const video_url = await tt.get_link_to_video(url)
        if (video_url == 'error') {
            await ctx.reply('Ой ой ой что то пошло не так...')
            return
        }
        if (!video_url) {
            return
        }
        await ctx.reply('Скачивание началось')
        await ctx.replyWithVideo(Input.fromURL(video_url), {
            caption: "[👉Тык👈](https://t.me/ttDownloadPyBot)",
            parse_mode: 'MarkdownV2'
        })
    } catch (error) {
        console.log(error)
    }
})
bot.launch();


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));