import { message, Slider, Input, Space, Form } from 'antd'
import Head from 'next/head'

import type { Server } from '@/types'

import CreateServerModal from '@/components/Server/Modal'
import ServerListItem from '@/components/Server/ListItem'

import { useAppState } from '@/provider/AppState'
import useLocalStorage from '@/hooks/useLocalStorage'

export default function Page() {
	const [gridSize, setGridSize] = useLocalStorage('gridsize', 3)
	const [search, setSearch] = useLocalStorage('serverSearch', '')

	const { serverList } = useAppState()

	// Filter Server by Name
	const filteredServerList = serverList.filter(
		(server:Server) => server.name.toLowerCase().includes(search.toLowerCase())
	)

	const serverListItems = filteredServerList.map((server:Server) => {
		return <ServerListItem key={`${server.id}`} server={server} />
	})

	const listStyles = {
		padding: '0 15px 15px',
		width: '100%',
		display:'grid',
		gap: '20px',
		gridTemplateColumns: `repeat(${gridSize}, 1fr)`
	}

	return (
		<>
			<Head>
				<title>RCON IO - Server</title>
			</Head>
			<div style={{display: 'inline-grid', gridTemplateColumns: '1fr 300px', padding: '15px 15px 0'}}>
				<Form.Item label="Columns" style={{ width: '300px'}}>
					<Slider min={1} max={12} value={gridSize} onChange={setGridSize} />
				</Form.Item>
				<Form.Item>
					<Input.Search
						placeholder="search for server"
						onChange={e => setSearch(e.target.value)}
						value={search}
						allowClear
						enterButton
						style={{ width: 300 }}
					/>
				</Form.Item>
			</div>
			{serverList.length === 0 ? (
				<div style={{textAlign: 'center'}}>
					<CreateServerModal />
				</div>
			) : (
				<Space style={listStyles}>
					{serverListItems}
				</Space>
			)}
		</>
	)
}
