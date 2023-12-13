import type { NextApiRequest, NextApiResponse } from 'next/types';
import type { User } from '../../../types'

import db from '../../../lib/db'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body)
    const user = db.data.users.find((item: User) => 
      item.name === body.name &&
      item.password === body.password
    )

    res.status(user ? 200 : 404).json({
      ...user,
      password: undefined
    })
  }
}
