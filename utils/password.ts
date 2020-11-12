import { hash, compare, genSaltSync } from 'bcryptjs'

const salt = genSaltSync(10)

export const encrypt = async (text: string) => {
  return await hash(text, salt)
}

export const verify = async (text: string, hashed: string) => {
  return await compare(text, hashed)
}
