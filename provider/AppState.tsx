/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { message } from 'antd'
import { useInterval } from 'usehooks-ts'
import useLocalStorage from '@/hooks/useLocalStorage'

import type { Server, User, Map, Promt } from '@/types'

interface IAppState {
  users: User[]
  fetchUsers: Function
  serverList: Server[]
  mapList: Map[]
  loggedInUser: User | null
  refreshServerList: Function
  selectedServer: User | null
  setSelectedServer: Function
  refreshMapList: Function
  setLoggedInUser: Function
  sendCommand: Function
  hasPermission: Function
  promtList: Promt[]
  refreshPromtList: Function
}

const DefaultState:IAppState = {
  users: [],
  serverList: [],
  mapList: [],
  loggedInUser: null,
  fetchUsers: () => {},
  refreshServerList: () => {},
  selectedServer: null,
  setSelectedServer: () => {},
  refreshMapList: () => {},
  setLoggedInUser: () => {},
  sendCommand: () => {},
  hasPermission: () => {},
  promtList: [],
  refreshPromtList: () => {}
}

const AppStateContext = createContext(DefaultState)

export const AppStateProvider = ({ children }:any) => {
  const [users, setUsers] = useState([])
  const [isClient, setIsClient] = useState(false)
  const [serverList, setServerlist] = useState([])
  const [mapList, setMapList] = useState([])
  const [loggedInUser, setLoggedInUser] = useLocalStorage('login', null)
  const [selectedServer, setSelectedServer] = useLocalStorage('selectedServer', null)
  const [promtList, setPromtList] = useState([])
  const hasPermission = (permission:string) => {
    if (!loggedInUser) return false
    if (loggedInUser.isAdmin) return true

    return loggedInUser?.permissions?.includes(permission) || false
  }

  const sendCommand = async (server:Server, promt:String) => {
    const command = promt.replace(/\n/g,';')

    await fetch(`/api/rcon/${server.id}`, {
			body: JSON.stringify({ command }),
			method: 'POST'
		})

    message.open({
      type: 'success',
      content: `Command send to ${server.name}`
    })
  }

  const refreshPromtList = async () => {
    const result = await (await fetch(`/api/promts`)).json()
		setPromtList(result)
  }

  const refreshServerList = async () => {
		const result = await (await fetch(`/api/server`)).json()
		setServerlist(result)
  }

  const refreshMapList = async () => {
		const result = await (await fetch(`/api/maps`)).json()
		setMapList(result)
  }

  const fetchUsers = async () => {
    const result = await (await fetch(`/api/user`)).json()
		setUsers(result)
  }

  useInterval(() => {
    refreshServerList()
  }, 5000)

  useEffect(() => {
    refreshServerList()
    setIsClient(true)
  }, [])

  // calls for logged in user
  useEffect(() => {
    if (loggedInUser) {
      refreshMapList()
      fetchUsers()
      refreshPromtList()
    }
  }, [loggedInUser])

  const state = useMemo(() => ({
    users, fetchUsers, 
    serverList, refreshServerList,
    selectedServer, setSelectedServer, 
    loggedInUser, setLoggedInUser, 
    mapList, refreshMapList,
    promtList, refreshPromtList,
    sendCommand,
    hasPermission
  }), [
    serverList, users, selectedServer, loggedInUser, mapList
  ])

  return (
    <AppStateContext.Provider value={state}>
      {isClient && children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => useContext(AppStateContext)
