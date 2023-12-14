import { Input, Button, Form, message, Divider, Typography } from 'antd'

import { useAppState } from '@/provider/AppState'

export default function Page({ onSubmit = () => {}}) {
	const { refreshCommandList } = useAppState()

	const [form] = Form.useForm()

	const saveMap = async () => {
		const values = await form.validateFields();

		const response = await fetch(`/api/command`, {
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
			refreshCommandList()
		}
    onSubmit()
	}

	return (
    <Form form={form} layout="vertical">
			<Typography.Title level={4} style={{ marginTop: 0}}>Create Server Promt</Typography.Title>
			<Divider />
      <Form.Item label="Name" name="name" required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
			<Form.Item label="Promt" name="commands" required extra={<a href="https://totalcsgo.com/commands" target="_blank">List of Commands</a>}>
        <Input.TextArea
					placeholder={`Add map specific server commands ex. mp_freezetime 0;`}
					autoSize={{ minRows: 5, maxRows: 12 }}
				/>
      </Form.Item>
      <Button type="primary" htmlType="submit" onClick={saveMap}>add map to list</Button>
    </Form>
	)
}
