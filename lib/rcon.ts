import Rcon from 'rcon-srcds'

import type { Server } from '@/types'

import db from './db'

class RconClient {
  isReady: boolean
  host: string
  port: number
  password: string
  rcon: Rcon | null

  constructor(server:Server) {
    this.isReady = false
    this.host = server.host
    this.port = server.port
    console.log(this.host, this.port)
    this.password = server.rcon

    this.rcon = null
  }

  async connect() {
    try {
      this.rcon = new Rcon({
        host: this.host, 
        port: this.port
      })

      await this.rcon.authenticate(this.password)

      this.isReady = true
    } catch (e) {
      this.isReady = false
      console.log(e)
    }
  }

  async run(command:string) {
    try {
      if (!this.rcon || !this.isReady) {
        await this.connect()
      }

      if (!this.isReady) return null

      if (this.rcon) {
        return await this.rcon.execute(command)
      }
    } catch (e) {
      console.log(`[RCON][${this.port}] `, e)
      this.isReady = false
    }
  }

  async getStatus() {
    try {
      if (!this.isReady) {
        await this.connect()
      }
      const response = await this.run('status')

      if (!response || response === true) return null

      const list = response.split(/\r?\n/)
      const dict:any = {
        hasPlayers: false,
      }

      for (let i = 0; i < list.length; i++) {
        try {
          const parts = list[i].split(':')
          dict[parts[0].trim()] = parts[1].trim()

        } catch (e) {
          console.log('rcon status parse error')
        }
      }

      dict.hasPlayers = !(response.indexOf('0 humans') !== -1)
      return dict
    } catch (e) {
      console.log(`[RCON][${this.host}:${this.port}] `, e)
      return null
    } 
  }
}

class RconManager {
  list: RconClient[]

  constructor() {
    this.list = []
  }

  getOrSet(server:Server) {
    if (server.port in this.list) {
      return this.list[server.port]
    }
    this.list[server.port] = new RconClient(server)

    return this.list[server.port]
  }

  writeLog(serverId:string, command:string) {
    const server = db.data.servers.find((server:Server) => server.id === serverId)
    console.log(server)
    if (server) {

      // cut oldest log entries
      if (server.log.length > 200) server.log.shift()

      server.log.push(command)
      db.write()
    }
  }

  async run(server:any, command:string) {
    const client = this.getOrSet(server)
    const result = await client.run(command)
    this.writeLog(server.id, command)
    return result
  }

  async getStatus(server:Server) {
    const client = this.getOrSet(server)
    return await client.getStatus()
  }
}

const Instance = new RconManager()
export default Instance
