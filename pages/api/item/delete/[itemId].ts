import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type ItemDeleteType = {
  itemId: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const { itemId } = req.query as ItemDeleteType

  try {
    const target = await prisma.items.findOne({
      where: { id: itemId },
    })
    if (!target) throw new Error('not_found')

    await prisma.items.delete({
      where: { id: target.id },
    })

    res.json({
      ok: true,
      msg: 'success',
    })
    res.status(200).end()
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
