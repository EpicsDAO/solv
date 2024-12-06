import dotenv from 'dotenv'
import { discordChangeLog } from './discordChangeLog'
import { messageChannel } from './messageChannel'
dotenv.config()

const REPO_NAME = 'gabrielhicks/solv'

const run = async () => {
  const langs = ['en', 'ja']
  const token = process.env.DISCORD_TOKEN || ''
  const channelIdEN = '1314659425319125013'
  const channelIdJA = '1314659425319125013'
  for (const lang of langs) {
    const channelId = lang === 'en' ? channelIdEN : channelIdJA
    const text = await discordChangeLog(REPO_NAME, lang)
    console.log(text)
    await messageChannel(token, channelId, { content: text })
  }
}
run()
