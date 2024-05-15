import dotenv from 'dotenv'
import { initializeApp } from 'firebase/app'
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import firebaseConfig from '@/lib/firebaseConfig'
import inquirer from 'inquirer'
import chalk from 'chalk'
dotenv.config()

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

export const login = async () => {
  let loginUserCredential: any
  const answer = await inquirer.prompt<{ email: string; password: string }>([
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email',
      default: 'labo@elsoul.nl',
    },
    {
      type: 'password',
      message: 'Enter Your Password',
      name: 'password',
      mask: '*',
    },
  ])
  try {
    await createUserWithEmailAndPassword(auth, answer.email, answer.password)
    loginUserCredential = await signInWithEmailAndPassword(
      auth,
      answer.email,
      answer.password,
    )
  } catch (error) {
    loginUserCredential = await signInWithEmailAndPassword(
      auth,
      answer.email,
      answer.password,
    )
  }

  const user = loginUserCredential.user
  await firestoreLogExport(user.accessToken)
  return { accessToken: user.accessToken as string, uid: user.uid as string }
}

export const firestoreLogExport = async (accessToken: string) => {
  console.log(
    '🚸 ========= Click the Link to Authorize Your Discord Account ========= 🚸\n',
  )
  const exportLog = `https://discord.com/oauth2/authorize?client_id=1238153194698178740&response_type=code&redirect_uri=https%3A%2F%2Flb.validatoors.cloud%2Fdiscord-func%2Flogin-redirect&scope=identify+email&state=${accessToken}\n`
  console.log(chalk.white(exportLog))
  console.log('🚸 =========           END           ========= 🚸\n')

  const successLog = `You will be redirected to the EpicsDAO Discord server Validatoors Cloud Channel.\nPlease use your Discord account to order the service.\n`
  console.log(chalk.yellow(successLog))
}
