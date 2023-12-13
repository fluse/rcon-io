export interface Map {
  id: string
  workshopId?: string
  filename?: string
  name: string
  commands: string
}

export interface DatabaseSchema {
  servers: Server[]
  users: User[]
  maps: Map[]
  commands: Command[]
}

export interface Command {
  id: string
  name: string
  promt: string
}

export interface User {
  id: string
  name: string
  password: string
  isAdmin?: boolean
  permissions: string[]
}

export interface Server {
  id: string
  name: string
  host: string
  port: number
  rcon: string
  log: string[]
}