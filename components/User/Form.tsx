import { useEffect } from 'react'
import {
	Input, Button, Form, message, Checkbox, Switch
} from 'antd'
import { ApiUrl } from '@/config/api'
import { useAppState } from '@/provider/AppState'
import permissions from '@/config/permissions'

export default function UserForm({
	user = null,
	onSubmit = () => {},
	buttonText = 'create'
}:any) {
	const { hasPermission, fetchUsers } = useAppState()

	const [form] = Form.useForm()

	const isAdmin = Form.useWatch('isAdmin', form)

	useEffect(() => {
		form.setFieldsValue(user)
	}, [form, user])
	
	const save = async () => {
		const values = await form.validateFields();

		let response = null
		if (user?.id) {
			response = await fetch(ApiUrl(`/api/user/${user.id}`), {
				body: JSON.stringify(values),
				method: 'PUT'
			})
		} else {
			response = await fetch(ApiUrl(`/api/user`), {
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
    <Form initialValues={user} disabled={!hasPermission('create_user')} form={form} layout="vertical">
      <Form.Item label="Name" name="name" required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
			<Form.Item label="Password" name="password" required rules={[{ required: !user?.id }]}>
        <Input.Password />
      </Form.Item>
			<Form.Item label="is admin?" name="isAdmin">
				<Switch defaultValue={false} />
      </Form.Item>
			<Form.Item label="Permissions" name="permissions">
				<Checkbox.Group disabled={isAdmin} options={permissions} defaultValue={[]} />
			</Form.Item>
      <Button type="primary" htmlType="submit" onClick={save}>{buttonText}</Button>
    </Form>
	)
}
