import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'

import { getToken } from 'utils/token'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = await getToken(req)
    if (!token) throw new Error('not_found')

    const cookie = serialize('passtorage-access-token', '', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      expires: new Date(0),
      secure: process.env.NODE_ENV === 'production',
    })

    res.setHeader('Set-Cookie', [cookie])
    res.status(200).end()
  } catch (err) {
    res.json({
      ok: false,
      msg: err,
    })
    res.status(500).end()
  }
}
