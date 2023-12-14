import { Layout, Menu } from 'antd'
import { useRouter } from 'next/router'
import {
  DatabaseTwoTone,
  SkinTwoTone,
  HomeTwoTone,
  PictureTwoTone,
  BoxPlotTwoTone,
} from '@ant-design/icons';

const { Header, Sider } = Layout;
const PageMenu = () => {
  const router = useRouter()

  const handleClick = ({ key }:any) => {
    router.push(`/${key}`)
  }

  const items = [
    {
      key: '',
      icon: <HomeTwoTone />,
      label: 'Home'
    },
    {
      key: 'server',
      icon: <DatabaseTwoTone />,
      label: 'Server',
    },
    {
      key: 'maps',
      icon: <PictureTwoTone />,
      label: 'Maps',
    },
    {
      key: 'user',
      icon: <SkinTwoTone />,
      label: 'User',
    },
  ]

  return (
    <>
      <Menu
        theme="light"
        mode="horizontal"
        onClick={handleClick}
        defaultSelectedKeys={['']}
        items={items}
        style={{flexGrow: '1'}}
      />
    </>
  )
}

export default PageMenu