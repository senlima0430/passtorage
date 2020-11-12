import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()

  try {
    const nums = await prisma.users.count()

    res.status(200)
    res.json({
      ok: true,
      msg: nums,
    })
  } catch (err) {
    res.status(500)
    res.json({
      ok: false,
      msg: 'failed',
    })
  } finally {
    await prisma.$disconnect()
  }
}
