import {
	Input, Button, Form, message, Checkbox, Divider, Typography, Switch
} from 'antd'

import { useAppState } from '@/provider/AppState'
import permissions from '@/config/permissions'

export default function UserForm({
	user = null, onSubmit = () => {},
	buttonText = 'create'
}:any) {
	const { hasPermission, fetchUsers } = useAppState()

	const [form] = Form.useForm()

	const save = async () => {
		const values = await form.validateFields();

		let response = null
		if (user?.id) {
			response = await fetch(`/api/user/${user.id}`, {
				body: JSON.stringify(values),
				method: 'PUT'
			})
		} else {
			response = await fetch(`/api/user`, {
				body: JSON.stringify(values),
				method: 'POST'
			})
		}		
		onSubmit()

		if (response.status !== 200) {
			return message.open({
				type: 'error',
				content: response.statusText
			})
		}

		form.resetFields()
		fetchUsers()
	}

	return (
    <Form initialValues={user} disabled={!hasPermission('modify_user')} form={form} layout="vertical">
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
				<Checkbox.Group options={permissions} defaultValue={[]} />
			</Form.Item>
      <Button type="primary" htmlType="submit" onClick={save}>{buttonText}</Button>
    </Form>
	)
}
