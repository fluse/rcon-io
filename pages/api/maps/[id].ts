import type { NextApiRequest, NextApiResponse } from 'next/types';

import db from '../../../lib/db'

import type { Map } from '../../../types'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.method === 'GET') {
    const { id } = req.query;
    const result = db.data.maps.find((item:Map) => item.id === id);

    res.status(result ? 200 : 404).json(result)
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    let map = db.data.maps.find((item:Map) => item.id === id);

    if (!map) return res.status(404).json(null)
    
    map = Object.assign(map, req.body)
    await db.write()
    res.status(200).json(map)
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    db.data.maps = db.data.maps.filter((item:Map) => item.id !== id)
    await db.write()
    return res.status(200).json(true)
  }
}
