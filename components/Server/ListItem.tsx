import React from 'react'
import { Avatar, Card, Popconfirm, message } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

import RconSay from '@/components/RCON/Say'
import { useAppState } from '@/provider/AppState'
import ModalServerManage from './Manage'

const ServerListItems = ({ server }:any) => {
  const { setSelectedServer, refreshServerList } = useAppState()

	const deleteServer = async (id:String) => {
		const response = await fetch(`/api/server/${id}`, {
			method: 'DELETE'
		})

		message.open({
			type: 'success',
			content: 'Server permanently deleted'
		})

		refreshServerList()
	}

  const actions = [
    <a key="connect" target="_blank" href={`steam://connect/${server.host}:${server.port}`}>join</a>,
    <ModalServerManage key="dfaef" server={server} />,
    <Popconfirm
      key="confirm"
      placement="left"
      title="Please Confirm"
      description="Should the server be permanently deleted?"
      onConfirm={_ => deleteServer(server.id)}
    >
      <DeleteTwoTone />
    </Popconfirm>
  ]

  return (
    <Card actions={actions}>
      <Card.Meta
        avatar={<Avatar src={`https://api.dicebear.com/7.x/shapes/svg?seed=${server.name}`} />}
        title={server.name}
        description={`${server.host}:${server.port}`}
      />
      <RconSay server={server} />
    </Card>
  )
}

export default ServerListItems;
