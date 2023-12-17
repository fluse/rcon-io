import React from 'react'
import { Avatar, Card, Popconfirm, message } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'
import { ApiUrl } from '@/config/api'
import RconSay from '@/components/RCON/Say'
import { useAppState } from '@/provider/AppState'
import ModalServerManage from './Manage'
import ServerFormModal from './Modal'

const ServerListItems = ({ server }:any) => {
  const { hasPermission, refreshServerList } = useAppState()

	const deleteServer = async (id:String) => {
		const response = await fetch(ApiUrl(`/api/server/${id}`), {
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
  ]

  if (hasPermission('modify_server')) actions.push(<ModalServerManage key="dfaef" server={server} />)

  const extras = []
  if (hasPermission('modify_server')) extras.push(
    <ServerFormModal buttonText="" server={server} type="update" />
  )
  if (hasPermission('modify_server')) extras.push(
    <Popconfirm
      key="confirm"
      placement="left"
      title="Please Confirm"
      description="Should the server be permanently deleted?"
      onConfirm={_ => deleteServer(server.id)}
    >
      <DeleteTwoTone />
    </Popconfirm>
  )

  return (
    <Card size="small" actions={actions} extra={extras}>
      <Card.Meta
        avatar={<Avatar src={`https://api.dicebear.com/7.x/shapes/svg?seed=${server.name}`} />}
        title={server.name}
        description={`${server.host}:${server.port}`}
      />
      {hasPermission('modify_server') && <RconSay server={server} />}
    </Card>
  )
}

export default ServerListItems
