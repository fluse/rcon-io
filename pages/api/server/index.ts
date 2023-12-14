import ShortUniqueId from 'short-unique-id'
import type { NextApiRequest, NextApiResponse } from 'next/types';
import type { Server } from '@/types'
import RconManager from '@/lib/rcon'
import db from '../../../lib/db'

const uid = new ShortUniqueId({ length: 6 });

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.method === 'GET') {

    const servers = []

    for (const server of db.data.servers) {
      if (!!server) {
        // const status = await RconManager.getStatus({
        //   host: server.host,
        //   port: server.port,
        //   password: server.rcon,
        // })

        servers.push({
          ...server,
          rcon: undefined,
        })
      }
    }
    res.status(200).json(servers)
  }

  if (req.method === 'POST') {
    const body = JSON.parse(req.body)

    try {
      const id = uid.rnd()
      const result = db.data.servers.push({
        id,
        log: [],
        ...body
      })
  
      await db.write()
      res.status(200).json(id);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

