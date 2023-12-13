import { JSONPreset } from 'lowdb/node'

import type { DatabaseSchema } from '@/types'
import { DefaultCommands } from '@/config/commands'
import { DefaultMaps } from '@/config/maps'

const defaultData:DatabaseSchema = {
  servers: [],
  commands: DefaultCommands,
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