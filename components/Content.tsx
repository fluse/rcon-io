import { Layout } from 'antd';
const { Content } = Layout;

const StyledContent = ({ children }) => (
  <Content
    style={{
      margin: '18px 14px',
      padding: 22,
      backgroundColor: '#fff'
    }}
  >
    {children}
  </Content>
);

export default StyledContent;