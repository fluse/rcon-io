import { useCallback, useEffect } from 'react'
import { Input, Button, Form, message, Row, Col, InputNumber } from 'antd'
import { ApiUrl } from '@/config/api'
import { useAppState } from '@/provider/AppState'

export default function FormServer({
	server = null,
	type = 'add',
	onSubmit = () => {},
	buttonText = 'create'
}:any) {
	const { hasPermission, refreshServerList } = useAppState()

	const [form] = Form.useForm()

	useEffect(() => {
		form.setFieldsValue(server)
	}, [form, server])

	const saveServer = async () => {
		let values = await form.validateFields();
		values.port = parseInt(values.port)

		let response = null
		if (server?.id) {
			response = await fetch(ApiUrl(`/api/server/${server?.id}`), {
				body: JSON.stringify(values),
				method: 'PUT'
			})
		} else {
			response = await fetch(ApiUrl(`/api/server`), {
				body: JSON.stringify(values),
				method: 'POST'
			})
		}

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

	const enrichedServer = {
		port: 27015,
		...server
	}

	return (
    <Form disabled={!hasPermission('modify_server')} initialValues={enrichedServer} form={form} layout="vertical">
      <Form.Item label="Name" name="name" required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
			<Row gutter={20}>
        <Col flex="auto">
      		<Form.Item label="Host" name="host" required rules={[{ required: true }]}>
						<Input />
					</Form.Item>
				</Col>
				<Col flex="130px">
					<Form.Item label="Port" name="port" required rules={[{ required: true }]}>
						<InputNumber />
					</Form.Item>
				</Col>
			</Row>
      <Form.Item label="RCON Password" name="rcon" required rules={[{ required: type === 'add' }]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit" onClick={saveServer}>{buttonText}</Button>
    </Form>
	)
}
