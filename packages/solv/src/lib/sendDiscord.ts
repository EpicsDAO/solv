import fetch from 'node-fetch'
import { DISCORD_WEBHOOK_URL } from '..'

export const sendDiscord = async (content: string) => {
  try {
    if (DISCORD_WEBHOOK_URL === '')
      throw new Error(
        'DISCORD_WEBHOOK_URL is empty\nPlease set DISCORD_WEBHOOK_URL in .env',
      )

    const body = {
      content,
      username: '🪄 Solv Notifier',
    }
    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.status !== 204) return false
    return true
  } catch (e) {
    console.log({ error: `Skeet sendDiscord Error - ${content}` })
    return false
  }
}
