import { Layout, Row, Col, Button } from 'antd'
import Image from 'next/image'
import { GithubOutlined } from '@ant-design/icons'
import Content from '@/components/Content'
import LoginForm from '@/components/Login/Form'

const LoginPage = () => (
  <Layout>
    <Row gutter={20}>
      <Col flex="auto"></Col>
      <Col flex="400px">
        <div style={{ textAlign: 'center', padding: '15px 0 0 0' }}>
          <Image src="favicon.svg" width={50} height={50} alt="" />
          <h1 style={{ marginTop: 0 }}>RCON IO</h1>
        </div>
        <Content>
          <LoginForm />
        </Content>
        <div style={{ textAlign: 'center'}}>
          <Button type="link" icon={<GithubOutlined />} href="https://github.com/fluse/rcon-io" target="_blank">Github</Button>
        </div>
      </Col>
      <Col flex="auto"></Col>
    </Row>
  </Layout>
)

export default LoginPage