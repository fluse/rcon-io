import type { NextApiRequest, NextApiResponse } from 'next/types'

import RconManager from '@/lib/rcon'
import db from '@/lib/db'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.method === 'POST') {
    
    const result = await RconManager.run({
      host: req.body.host,
      port: req.body.port,
      password: req.body.password,
    }, req.body.command)

    res.status(200).json(result);
  }
  
}
