import crypto from 'crypto'
import { parse } from 'cookie'
import { JWT, JWE, JWK } from 'jose'
import { IncomingMessage } from 'http'

export const hash = (...args: string[]) => {
  return crypto.createHash('sha512').update(args.join('')).digest('hex')
}

export const secret = () => {
  return hash(process.env.HASH_SALT)
}

const KEY = JWK.asKey(Buffer.from(secret()))

export const createToken = (payload: Record<string, any>) => {
  return JWT.sign(payload, KEY, {
    expiresIn: '30d',
  })
}

export const verifyToken = (token: string) => {
  try {
    return JWT.verify(token, KEY)
  } catch (e) {
    return false
  }
}

export const createSecureToken = async (payload: Record<string, any>) => {
  return JWE.encrypt(await createToken(payload), KEY)
}

export const parseSecureToken = async (token: string) => {
  try {
    const result = await JWE.decrypt(token, KEY)
    return verifyToken(result.toString())
  } catch {
    return null
  }
}

export const getToken = async (req: IncomingMessage) => {
  const cookies = parse(req.headers.cookie ?? '')
  const token = cookies['passtorage-access-token']
  return await parseSecureToken(token)
}
