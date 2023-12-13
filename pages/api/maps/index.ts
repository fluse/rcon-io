import ShortUniqueId from 'short-unique-id'
import type { NextApiRequest, NextApiResponse } from 'next/types';

import db from '../../../lib/db'

const uid = new ShortUniqueId({ length: 6 });

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.method === 'GET') {
    res.status(200).json(db.data.maps)
  }

  if (req.method === 'POST') {
    const body = JSON.parse(req.body)

    try {
      const id = uid.rnd()
      const result = db.data.maps.push({
        ...body,
        id,
      })
      
      await db.write()
      res.status(200).json(id);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

