import { Input, Button, Form, message, Row, Col } from 'antd'

import { useAppState } from '../../provider/AppState'

export default function Page({ onSubmit = () => {}}) {
	const { refreshServerList } = useAppState()

	const [form] = Form.useForm()

	const saveServer = async () => {
		const values = await form.validateFields();

		const response = await fetch(`http://localhost:3000/api/server`, {
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
			refreshServerList()
		}
    onSubmit()
	}

	return (
    <Form form={form} layout="vertical">
      <Form.Item label="Name" name="name" required>
        <Input />
      </Form.Item>
			<Row gutter={20}>
        <Col flex="auto">
      		<Form.Item label="Host" name="host" required rules={[{ required: true }]}>
						<Input />
					</Form.Item>
				</Col>
				<Col flex="120px">
					<Form.Item label="Port" name="port" required rules={[{ required: true }]}>
						<Input />
					</Form.Item>
				</Col>
			</Row>
      <Form.Item label="RCON Password" name="rcon" required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit" onClick={saveServer}>add Server</Button>
    </Form>
	);
}
