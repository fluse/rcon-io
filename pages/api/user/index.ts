import ShortUniqueId from 'short-unique-id'
import type { NextApiRequest, NextApiResponse } from 'next/types';
import type { User } from '../../../types'

import db from '../../../lib/db'

const uid = new ShortUniqueId({ length: 6 });

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {
    let user = db.data.users.map((item:User) => ({
      ...item,
      password: undefined,
    }))
    res.status(200).json(user)
  }

  if (req.method === 'POST') {
    const body = JSON.parse(req.body)

    const id = uid.rnd()

    db.data.users.push({ id, ...body })
    await db.write()
    res.status(200).json(id)
  }
}
