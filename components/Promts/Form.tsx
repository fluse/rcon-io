import { useEffect } from 'react'
import { Input, Button, Form, message } from 'antd'
import { ApiUrl } from '@/config/api'

import { useAppState } from '@/provider/AppState'

export default function FormPromt({
	promt = null,
	onSubmit = () => {},
	buttonText = 'create'
}:any) {
	const { selectedServer, sendCommand, hasPermission, refreshPromtList } = useAppState()

	const [form] = Form.useForm()

	useEffect(() => {
		form.setFieldsValue(promt)
	}, [form, promt])	

	const testCommand = async () => {
		const values = await form.validateFields()

		sendCommand(selectedServer, values.promt)
	}

	const save = async () => {
		const values = await form.validateFields()
		let response = null
		if (promt?.id) {
			response = await fetch(ApiUrl(`/api/promts/${promt.id}`), {
				body: JSON.stringify(values),
				method: 'PUT'
			})
		} else {
			response = await fetch(ApiUrl(`/api/promts`), {
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
			refreshPromtList()
		}
    onSubmit()
	}

	return (
    <Form initialValues={promt} disabled={!hasPermission('create_promts')} form={form} layout="vertical">
      <Form.Item label="Name" name="name" required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
			<Form.Item label="Promt" name="promt" required extra={<a href="https://totalcsgo.com/commands" target="_blank">List of Commands</a>}>
        <Input.TextArea
					placeholder={`Add map specific server commands ex. mp_freezetime 0;`}
					autoSize={{ minRows: 10, maxRows: 12 }}
				/>
      </Form.Item>
      <Button type="primary" htmlType="submit" onClick={save}>{buttonText}</Button>
			{hasPermission('create_promts') && (
				<Button disabled={!selectedServer} type="link" onClick={testCommand}>test</Button>
			)}
    </Form>
	)
}
