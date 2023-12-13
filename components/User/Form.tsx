import { Input, Button, Form, message, Checkbox, Divider, Typography, Switch } from 'antd'

import { useAppState } from '../../provider/AppState'
import useLocalStorage from '@/hooks/useLocalStorage'

export default function Page({ onSubmit = () => {}}) {
	const { fetchUsers } = useAppState()

	const [form] = Form.useForm()

	const save = async () => {
		const values = await form.validateFields();

		const response = await fetch(`/api/user`, {
			body: JSON.stringify(values),
			method: 'POST'
		})

		if (response.status !== 200) {
			message.open({
				type: 'error',
				content: response.statusText
			})
		} else {
			form.resetFields()
			fetchUsers()
		}
    onSubmit()
	}

	return (
    <Form form={form} layout="vertical">
			<Typography.Title level={4} style={{ marginTop: 0}}>Create User</Typography.Title>
			<Divider />
      <Form.Item label="Name" name="name" required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
			<Form.Item label="Password" name="password" required rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
			<Form.Item label="is admin?" name="isAdmin">
				<Switch defaultValue={false} />
      </Form.Item>
			<Form.Item label="Permissions" name="permissions">
				<Checkbox.Group options={['modify_user', 'modify_server']} defaultValue={[]} />
			</Form.Item>
      <Button type="primary" htmlType="submit" onClick={save}>Create User</Button>
    </Form>
	)
}
