import type { NextApiRequest, NextApiResponse } from 'next/types';

import type { Server } from '@/types'

import RconManager from '@/lib/rcon'
import db from '@/lib/db'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.method === 'POST') {
    const { id } = req.query
    const server = db.data.servers.find((item:Server) => item.id === id)

    if (!server) return res.status(401).json('Server not Found')
    const body = JSON.parse(req.body)
    console.log(body)
    const result = await RconManager.run(server, body.command)

    res.status(200).json(result)
  }
  
}
