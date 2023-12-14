import { Layout } from 'antd';
const { Content } = Layout;

const StyledContent = ({ children }:any) => (
  <Content
    style={{
      margin: '18px 14px',
      padding: 16,
      backgroundColor: '#fff'
    }}
  >
    {children}
  </Content>
);

export default StyledContent;