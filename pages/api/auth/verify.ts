import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

import { getToken } from 'utils/token'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  try {
    const data = (await getToken(req)) as Record<string, any>

    if (data) {
      const user = await prisma.users.findOne({
        where: {
          name: data.name,
        },
      })
      if (!user) throw new Error('not_found')

      res.json({ data })
      res.status(200).end()
    } else {
      res.status(401).end()
    }
  } catch (e) {
    res.status(403).end()
  } finally {
    await prisma.$disconnect()
  }
}
