import { message, Row, Col, List, Space, Input } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

import type { User } from '@/types'

import Content from '@/components/Content'
import AddUserForm from '@/components/User/Form'

import { useAppState } from '@/provider/AppState'
import StyledContent from '@/components/Content'
import useLocalStorage from '@/hooks/useLocalStorage'

export default function Page() {
  const [search, setSearch] = useLocalStorage('userSearch', '')
	const { users, fetchUsers } = useAppState()

  const filteredUsers = users.filter(
    (map:User) => map.name.toLowerCase().includes(search.toLowerCase())
  )

  const remove = async (id:String) => {
    if (users.length === 1) {
      return message.open({
        type: 'error',
        content: 'Last user cannot be deleted'
      })
    }
    const response = await fetch(`/api/user/${id}`, {
			method: 'DELETE'
		})
		message.open({
			type: 'success',
			content: 'Map permanently deleted'
		})
		fetchUsers()
  }

	return (
		<>
      <Space size="large" style={{display: 'block', padding: '15px 15px 0', width: '100%'}}>
        <Row>
          <Col flex="400px">
						<Content>
							<AddUserForm />
						</Content>
          </Col>
          <Col flex={3}>
            <Space size="large" style={{display: 'block', padding: '18px 15px 0 15px', width: '100%'}}>
              <Input.Search
                placeholder="search for user"
                defaultValue={search}
                onChange={e => setSearch(e.target.value)}
                allowClear
              />
            </Space>
            <StyledContent>
              <List
                pagination={{ size: 'small', pageSize: 15, position: 'bottom', align: 'end' }}
                size="small"
                dataSource={filteredUsers}
                renderItem={(item:User) => (
                  <List.Item actions={[
                    <a key="df" onClick={e => remove(item.id)}><DeleteTwoTone disabled={users.length === 1} /></a>
                  ]}>
                    {item.isAdmin && '<Admin> '}{item.name}
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
