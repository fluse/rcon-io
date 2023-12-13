import { Card, Popconfirm, message } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

import RconSay from '@/components/RCON/Say'
import RconTeams from '@/components/RCON/Teams'
import RconMaps from '@/components/RCON/Maps'
import { useAppState } from '@/provider/AppState'

const serverListItems = ({ server }:any) => {
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
    <a key="manage" onClick={e => setSelectedServer(server)}>manage</a>,
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
        title={server.name}
        description={`${server.host}:${server.port}`}
      />
      <RconSay server={server} />
      <RconTeams server={server} />
      <RconMaps server={server} />
    </Card>
  )
}

export default serverListItems;
