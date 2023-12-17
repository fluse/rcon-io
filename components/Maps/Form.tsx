import { Input, Button, Form, message, Segmented, Divider, Typography } from 'antd'
import { ApiUrl } from '@/config/api'
import { useAppState } from '@/provider/AppState'
import useLocalStorage from '@/hooks/useLocalStorage'

export default function FormMap({ onSubmit = () => {}}) {
	const { hasPermission, refreshMapList } = useAppState()
	const [mapType, setMapType] = useLocalStorage('mapType', 'Workshop')

	const [form] = Form.useForm()

	const saveMap = async () => {
		const values = await form.validateFields();

		const response = await fetch(ApiUrl('/api/maps'), {
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
			refreshMapList()
		}
    onSubmit()
	}

	return (
    <Form disabled={!hasPermission('create_map')} form={form} layout="vertical">
			<Typography.Title level={4} style={{ marginTop: 0}}>Add Map to List</Typography.Title>
			<Divider />
			<Segmented options={['Workshop', 'File']} value={mapType} onChange={setMapType} />
			<Divider />
      <Form.Item label="Name" name="name" required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item hidden={mapType === 'File'} label="Steam Workshop ID" name="workshopId" required extra={<a href="https://steamcommunity.com/app/730/workshop/" target="_blank">Steam Workshop</a>} rules={[{ required: mapType === 'Workshop' }]}>
        <Input />
      </Form.Item>
			<Form.Item hidden={mapType === 'Workshop'} label="Filename" name="filename" required rules={[{ required: mapType === 'File' }]}>
        <Input />
      </Form.Item>
			<Form.Item label="Server Commands" name="commands" required extra={<a href="https://totalcsgo.com/commands" target="_blank">List of Commands</a>}>
        <Input.TextArea
					placeholder={`Add map specific server commands ex. mp_freezetime 0;`}
					autoSize={{ minRows: 3, maxRows: 12 }}
				/>
      </Form.Item>
      <Button type="primary" htmlType="submit" onClick={saveMap}>add map to list</Button>
    </Form>
	)
}
