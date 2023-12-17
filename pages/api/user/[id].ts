import type { NextApiRequest, NextApiResponse } from 'next/types';
import type { User } from '../../../types'

import db from '../../../lib/db'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.method === 'PUT') {
    const { id } = req.query;
    let user = <User>db.data.users.find((item:User) => item.id === id);

    if (!user) res.status(404).json(null)

    const body = JSON.parse(req.body)

    // fill current pw if no changes
    if (!body.password || body.password.length === 0) body.password === user.password

    user = Object.assign(user, body)
    await db.write()
    res.status(200).json(user)
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    db.data.users = db.data.users.filter((item:User) => item.id !== id);
    await db.write();
    return res.status(200).json(true)
  }
}
