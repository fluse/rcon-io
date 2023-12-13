import { useState, useEffect } from 'react'

export const useSocket = () => {  
  const [isConnected, setConnected] = useState(false)
  const [client, setClient] = useState(null)

  const connectClient = () => {
    try {
      const newClient = new WebSocket('ws://localhost:3003/realtime')
      newClient.onopen = () => {
        setConnected(true)
        console.log('connected')
      }
      newClient.onmessage = (event) => {
        console.log('received: %s', event.data)
      }
      newClient.onclose = () => {
        try {
          setConnected(false)
          console.log('closed')
        } catch (e) {

        }
      }
      setClient(newClient)
    } catch(e) {
      
    }
  }

  useEffect(() => {
    connectClient()
    return () => {
      setClient(null)
    }
  }, [])

  return [isConnected, client]
}

export default useSocket