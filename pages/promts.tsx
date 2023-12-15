import { message, Row, Col, List, Space, Input, Rate, Button } from 'antd'
import { DeleteTwoTone, PlayCircleTwoTone } from '@ant-design/icons'
import Head from 'next/head'
import type { Promt } from '@/types'

import Content from '@/components/Content'
import FormCommands from '@/components/Promts/Form'
import ModalPromt from '@/components/Promts/Modal'

import { useAppState } from '@/provider/AppState'
import StyledContent from '@/components/Content'
import useLocalStorage from '@/hooks/useLocalStorage'

export default function Page() {
  const [search, setSearch] = useLocalStorage('mapSearch', '')
	const { hasPermission, promtList, refreshPromtList, selectedServer, sendCommand } = useAppState()

  const filteredList = promtList.filter(
    (map:Promt) => map.name.toLowerCase().includes(search.toLowerCase())
  )

  const remove = async (id:String) => {
    const response = await fetch(`${window.location.host}/api/promts/${id}`, {
			method: 'DELETE'
		})
		message.open({
			type: 'success',
			content: 'Map permanently deleted'
		})
		refreshPromtList()
  }

  const update = async (id:string, values:any) => {
    const response = await fetch(`${window.location.host}/api/promts/${id}`, {
			method: 'PUT',
      body: JSON.stringify(values)
		})
		message.open({
			type: 'success',
			content: 'Update Map'
		})
		refreshPromtList()
  }

	return (
		<>
      <Head>
				<title>RCON IO - Promts</title>
			</Head>
      <Space size="large" style={{display: 'block', padding: '15px 15px 0', width: '100%'}}>
        <Row>
          <Col flex="600px">
            <Content>
              <FormCommands />
            </Content>
          </Col>
          <Col flex={3}>
            <Space size="large" style={{display: 'block', padding: '18px 15px 0 15px', width: '100%'}}>
              <Input.Search
                placeholder="search for promt"
                defaultValue={search}
                onChange={e => setSearch(e.target.value)}
                allowClear
              />
            </Space>
            <StyledContent>
              <List
                pagination={{ size: 'small', pageSize: 15, position: 'bottom', align: 'end' }}
                size="small"
                dataSource={filteredList}
                renderItem={(item:Promt) => (
                  <List.Item actions={[
                    hasPermission('modify_promts') && (<ModalPromt promt={item} />),
                    <a key="df" onClick={e => remove(item.id)}><DeleteTwoTone /></a>,
                  ]}>
                    <Button type="link" onClick={_ => sendCommand(selectedServer, item.promt)}icon={<PlayCircleTwoTone />} />{item.name}
                  </List.Item>
                )}
              />
            </StyledContent>
          </Col>
        </Row>
      </Space>
		</>
	);
}
