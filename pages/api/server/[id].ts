import type { NextApiRequest, NextApiResponse } from 'next/types';

import db from '../../../lib/db'

import type { Server } from '../../../types'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.method === 'GET') {
    const { id } = req.query;
    const server = db.data.servers.find((item:Server) => item.id === id);

    res.status(server ? 200 : 404).json(server)
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    let server = db.data.servers.find((item:Server) => item.id === id);

    if (!server) return res.status(404).json(null)
    
    server = Object.assign(server, req.body)
    await db.write()
    res.status(200).json(server)
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    console.log(id)
    db.data.servers = db.data.servers.filter((item:Server) => item.id !== id)
    await db.write()
    return res.status(200).json(true)
  }
}
