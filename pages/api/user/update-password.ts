import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

import { UserUpdateType } from 'interfaces'
import { encrypt } from 'utils/password'
import { getToken } from 'utils/token'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const { password } = req.body as UserUpdateType
  const user = (await getToken(req)) as Record<string, any>

  if (!password) throw new Error('invaild')

  try {
    await prisma.users.update({
      where: {
        name: user.name,
      },
      data: {
        password: await encrypt(password),
      },
    })

    res.json({
      ok: true,
      msg: 'updated',
    })
    res.status(200).end()
  } catch (err) {
    res.json({
      ok: false,
      msg: 'failed',
    })
    res.status(500).end()
  } finally {
    await prisma.$disconnect()
  }
}
