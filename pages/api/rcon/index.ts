import RconManager from '@/lib/rcon'
import db from '@/lib/db'

export default async function handler(req, res) {

  if (req.method === 'POST') {
    
    const result = await RconManager.run({
      host: req.body.host,
      port: req.body.port,
      password: req.body.password,
    }, req.body.command)

    res.status(200).json(result);
  }
  
}
