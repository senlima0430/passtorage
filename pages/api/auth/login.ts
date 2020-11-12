import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { serialize } from 'cookie'

import { UserInputType } from 'interfaces'
import { verify } from 'utils/password'
import { createSecureToken } from 'utils/token'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const { name, password } = req.body as UserInputType

  try {
    const user = await prisma.users.findOne({
      where: {
        name,
      },
    })
    if (!user) throw new Error('not_found')

    const isPass = await verify(password, user.password)
    if (isPass) {
      const token = await createSecureToken({
        id: user.id,
        name: user.name,
        isAdmin: user.name === 'admin',
      })
      const cookie = serialize('passtorage-access-token', token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
      })

      res.setHeader('Set-Cookie', [cookie])
      res.json({
        ok: true,
        token: token,
      })
      res.status(200).end()
    } else {
      throw new Error('failed')
    }
  } catch (err) {
    res.json({
      ok: false,
      msg: err,
    })
    res.status(500).end()
  } finally {
    await prisma.$disconnect()
  }
}
