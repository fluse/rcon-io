import { message, Row, Col, List, Space, Input, Rate } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

import type { Map } from '@/types'

import Content from '@/components/Content'
import FormCommands from '@/components/Command/Form'

import { useAppState } from '@/provider/AppState'
import StyledContent from '@/components/Content'
import useLocalStorage from '@/hooks/useLocalStorage'

export default function Page() {
  const [search, setSearch] = useLocalStorage('mapSearch', '')
	const { mapList, refreshMapList } = useAppState()

  const filteredMap = mapList.filter(
    (map:Map) => map.name.toLowerCase().includes(search.toLowerCase())
  )

  const removeMap = async (id:String) => {
    const response = await fetch(`/api/maps/${id}`, {
			method: 'DELETE'
		})
		message.open({
			type: 'success',
			content: 'Map permanently deleted'
		})
		refreshMapList()
  }

  const update = async (id:string, values:any) => {
    const response = await fetch(`/api/maps/${id}`, {
			method: 'PUT',
      body: JSON.stringify(values)
		})
		message.open({
			type: 'success',
			content: 'Update Map'
		})
		refreshMapList()
  }

	return (
		<>
      <Space size="large" style={{display: 'block', padding: '15px 15px 0', width: '100%'}}>
        <Row>
          <Col flex="400px">
            <Content>
              <FormCommands />
            </Content>
          </Col>
          <Col flex={3}>
            <Space size="large" style={{display: 'block', padding: '18px 15px 0 15px', width: '100%'}}>
              <Input.Search
                placeholder="search for map"
                defaultValue={search}
                onChange={e => setSearch(e.target.value)}
                allowClear
              />
            </Space>
            <StyledContent>
              <List
                pagination={{ size: 'small', pageSize: 15, position: 'bottom', align: 'end' }}
                size="small"
                dataSource={filteredMap}
                renderItem={(item:Map) => (
                  <List.Item actions={[
                    <a key="workshop" hidden={!('workshopId' in item)} href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${item.workshopId}`} target="_blank">Workshop</a>,
                    <Rate key="rating" allowHalf defaultValue={item.rating} onChange={rating => update(item.id, {
                      rating
                    })} />,
                    <a key="df" onClick={e => removeMap(item.id)}><DeleteTwoTone /></a>
                  ]}>
                    {item.name}
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