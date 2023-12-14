import type { NextApiRequest, NextApiResponse } from 'next/types'

import RconManager from '@/lib/rcon'
import db from '@/lib/db'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.method === 'POST') {
    const body = JSON.parse(req.body)
    const result = await RconManager.run({
      host: body.host,
      port: body.port,
      password: body.password,
    }, body.command)

    res.status(200).json(result);
  }
  
}
