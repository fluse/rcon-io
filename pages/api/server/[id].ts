import type { NextApiRequest, NextApiResponse } from 'next/types'

import db from '@/lib/db'

import type { Server } from '@/types'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.method === 'GET') {
    const { id } = req.query
    const result = db.data.servers.find((item:Server) => item.id === id)

    res.status(result ? 200 : 404).json(result)
  }

  if (req.method === 'PUT') {
    const { id } = req.query
    let server = db.data.servers.find((item:Server) => item.id === id)

    if (!server) return res.status(404).json(null)

    const body = JSON.parse(req.body)

    // fill current pw if no changes
    if (!body.rcon || body.rcon.length === 0) body.rcon === server.rcon

    server = Object.assign(server, body)
    await db.write()
    res.status(200).json(server)
  }

  if (req.method === 'DELETE') {
    const { id } = req.query
    db.data.servers = db.data.servers.filter((item:Server) => item.id !== id)

    await db.write()
    return res.status(200).json(true)
  }
}
