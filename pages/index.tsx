import Head from 'next/head'
import { Card, Statistic } from 'antd';
import { useAppState } from '@/provider/AppState';

export default function Home() {
	const { mapList, serverList, users, promtList } = useAppState()

	const gridStyles = {
		display: 'inline-grid',
		gap: '10px',
		gridTemplateColumns: 'repeat(4, 0.2fr)',
		padding: '15px 15px 0'
	}

	return (
		<>
			<Head>
				<title>RCON IO</title>
			</Head>

			<div style={gridStyles}>

				<Card bordered={false} style={{display: 'block', width: '100%'}}>
					<Statistic
						title="Server"
						value={serverList.length}
					/>
				</Card>

				<Card bordered={false} style={{width: '100%'}}>
					<Statistic
						title="Maps"
						value={mapList.length}
					/>
				</Card>

				<Card bordered={false}>
					<Statistic
						title="User"
						value={users.length}
					/>
				</Card>

				<Card bordered={false}>
					<Statistic
						title="Promts"
						value={promtList.length}
					/>
				</Card>
				
			</div>
		</>
	)
}
