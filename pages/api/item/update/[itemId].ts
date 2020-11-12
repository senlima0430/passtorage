import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

import { ItemUpdateInputType } from 'interfaces'

type QueryType = {
  itemId: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const { itemId } = req.query as QueryType
  const { name, description, content } = req.body as ItemUpdateInputType

  try {
    const target = await prisma.items.findOne({
      where: { id: itemId },
    })
    if (!target) throw new Error('not_found')

    await prisma.items.update({
      where: {
        id: itemId,
      },
      data: {
        name: name ?? target.name,
        description: description ?? target.description,
        content: content ?? target.content,
      },
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
