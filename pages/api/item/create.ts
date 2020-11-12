import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

import { ItemInputType } from 'interfaces'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const {
    user_id,
    name,
    description = '',
    content,
  } = req.body as ItemInputType

  try {
    const result = await prisma.items.create({
      data: {
        name,
        description,
        content,
        users: {
          connect: {
            id: +user_id,
          },
        },
      },
    })

    res.json({
      ok: true,
      data: result,
    })
    res.status(200).end()
  } catch (err) {
    res.json({
      ok: false,
      data: {},
    })
    res.status(500).end()
  } finally {
    await prisma.$disconnect()
  }
}
