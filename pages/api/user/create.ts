import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

import { UserInputType } from 'interfaces'
import { encrypt } from 'utils/password'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const { name, password } = req.body as UserInputType

  try {
    await prisma.users.create({
      data: {
        name,
        password: await encrypt(password),
      },
    })

    res.json({
      ok: true,
      msg: 'created',
    })
    res.status(201).end()
  } catch (err) {
    res.json({
      ok: false,
      msg: 'create_failed',
    })
    res.status(500).end()
  } finally {
    await prisma.$disconnect()
  }
}
