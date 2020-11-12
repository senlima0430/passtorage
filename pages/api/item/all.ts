import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

import { getToken } from 'utils/token'

type QueryType = {
  size: string
  page: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const { size = '10', page = '1' } = req.query as QueryType

  try {
    const user = (await getToken(req)) as Record<string, any>
    const result = await prisma.items.findMany({
      skip: +size * (+page - 1),
      take: +size,
      where: {
        users: {
          name: user.name,
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
      data: [],
    })
    res.status(500).end()
  } finally {
    await prisma.$disconnect()
  }
}
