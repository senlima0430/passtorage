import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

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
    const result = await prisma.items.findMany({
      skip: +size * (+page - 1),
      take: +size,
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
