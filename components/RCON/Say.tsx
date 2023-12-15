import { message, Input, Button, Space, Form } from 'antd'
import { SendOutlined } from '@ant-design/icons'

const RconSay = ({ server }:any) => {
  const [form] = Form.useForm();

  const sendMessage = async () => {
    const values = await form.validateFields()

    await fetch(`${window.location.host}/api/rcon/${server.id}`, {
			body: JSON.stringify({
        command: `say ${values.command}`
      }),
			method: 'POST'
		})

    form.resetFields()

    message.open({
      type: 'success',
      content: `Send!`
    })
  }  

  return (
    <Form form={form}>
      <Space.Compact style={{ width: '100%', paddingTop: '15px' }}>
        <Form.Item name="command" style={{ width: '100%'}} rules={[{ required: true }]}>
          <Input size="large" placeholder="Say to server" />
        </Form.Item>
        <Button type="primary" size="large" htmlType='submit' onClick={sendMessage} icon={<SendOutlined />} />
      </Space.Compact>
    </Form>
  )
}

export default RconSay;