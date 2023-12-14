import type { NextApiRequest, NextApiResponse } from 'next/types'

import db from '@/lib/db'

import type { Promt } from '@/types'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.method === 'GET') {
    const { id } = req.query
    const result = db.data.promts.find((item:Promt) => item.id === id)

    res.status(result ? 200 : 404).json(result)
  }

  if (req.method === 'PUT') {
    const { id } = req.query
    let result = db.data.promts.find((item:Promt) => item.id === id)

    if (!result) return res.status(404).json(null)

    const body = JSON.parse(req.body)
    result = Object.assign(result, body)

    await db.write()
    res.status(200).json(result)
  }

  if (req.method === 'DELETE') {
    const { id } = req.query
    db.data.promts = db.data.promts.filter((item:Promt) => item.id !== id)
    await db.write()
    return res.status(200).json(true)
  }
}
