import { NextApiRequest, NextApiResponse } from 'next'

import { getToken } from 'utils/token'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await getToken(req)

    if (data) {
      res.json({ data })
      res.status(200).end()
    } else {
      res.status(401).end()
    }
  } catch (e) {
    res.status(403).end()
  }
}
