import { Input, Button, Form, message, Typography, Divider } from 'antd'

import { useAppState } from '../../provider/AppState'

export default function Page({ onSubmit = () => {}}) {
	const { refreshServerList, setLoggedInUser } = useAppState()

	const [form] = Form.useForm()

	const saveServer = async () => {
		const values = await form.validateFields();

		const response = await fetch(`${window.location.host}/api/user/auth`, {
			body: JSON.stringify(values),
			method: 'POST'
		})

		if (response.status !== 200) {
			message.open({
				type: 'error',
				content: 'login failed'
			})
		} else {
      const body = await response.json()
      setLoggedInUser(body)
			form.resetFields()
			refreshServerList()
		}
    onSubmit()
	}

	return (
    <Form form={form} layout="vertical">
			<Typography.Title level={4} style={{marginTop: 0}}>Login</Typography.Title>
			<Divider />
      <Form.Item label="Name" name="name" required rules={[{ required: true }]}>
        <Input autoComplete="username" />
      </Form.Item>
      <Form.Item label="Password" name="password" required rules={[{ required: true }]}>
        <Input.Password autoComplete="current-password" />
      </Form.Item>
      <Button type="primary" htmlType="submit" onClick={saveServer} style={{width: '100%'}}>login</Button>
    </Form>
	);
}
