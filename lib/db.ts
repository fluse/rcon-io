import { JSONPreset } from 'lowdb/node'

import type { DatabaseSchema } from '@/types'
import { DefaultPromts } from '@/config/promts'
import { DefaultMaps } from '@/config/maps'

const defaultData:DatabaseSchema = {
  servers: [],
  promts: DefaultPromts,
  maps: DefaultMaps,
  users: [{
    id: 'aaa',
    name: 'gaben',
    password: 'money',
    isAdmin: true,
    permissions: []
  }]
}

export default await JSONPreset<DatabaseSchema>('./db.json', defaultData)