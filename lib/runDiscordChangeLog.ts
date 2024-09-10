import dotenv from 'dotenv'
import { discordChangeLog } from './discordChangeLog'
import { messageChannel } from './messageChannel'
dotenv.config()

const REPO_NAME = 'epicsDAO/solv'

const run = async () => {
  const langs = ['en', 'ja']
  const token = process.env.DISCORD_TOKEN || ''
  const channelIdEN = '1279918138149834793'
  const channelIdJA = '1279911696571437057'
  for (const lang of langs) {
    const channelId = lang === 'en' ? channelIdEN : channelIdJA
    const text = await discordChangeLog(REPO_NAME, lang)
    console.log(text)
    await messageChannel(token, channelId, { content: text })
  }
}
run()
