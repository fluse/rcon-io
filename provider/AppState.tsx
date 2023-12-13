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
import useLocalStorage from '@/hooks/useLocalStorage'

import type { Server, User, Map } from '@/types'

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
  setLoggedInUser: () => {}
}

const AppStateContext = createContext(DefaultState)

export const AppStateProvider = ({ children }:any) => {
  const [users, setUsers] = useState([])
  const [isClient, setIsClient] = useState(false)
  const [serverList, setServerlist] = useState([])
  const [mapList, setMapList] = useState([])
  const [loggedInUser, setLoggedInUser] = useLocalStorage('login', null)
  const [selectedServer, setSelectedServer] = useLocalStorage('selectedServer', null)

  const sendCommand = async (server:Server, command:String) => {
    await fetch(`http://localhost:3000/api/rcon/${server.id}`, {
			body: JSON.stringify({ command }),
			method: 'POST'
		})

    message.open({
      type: 'success',
      content: `Send!`
    })
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

  useEffect(() => {
    refreshServerList()
    setIsClient(true)
  }, [])

  // calls for logged in user
  useEffect(() => {
    if (loggedInUser) {
      refreshMapList()
      fetchUsers()
    }
  }, [loggedInUser])

  const state = useMemo(() => ({
    users, fetchUsers, 
    serverList, selectedServer, setSelectedServer, refreshServerList,
    loggedInUser, setLoggedInUser, refreshMapList, mapList, sendCommand
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
