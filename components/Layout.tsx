import React from 'react'
import CreateServerModal from '@/components/Server/Modal'

import { Layout, Select, Flex, message } from 'antd'
import type { Server } from '@/types'

const { Header } = Layout;
import Menu from '@/components/Menu'
import LoginPage from '@/components/Login/Page'
import Logout from '@/components/Login/Logout'

import { useAppState } from '@/provider/AppState';
import Image from 'next/image';
import Link from 'next/link';

const PageLayout = ({ children }:any) => {
  const { hasPermission, serverList, loggedInUser, selectedServer, setSelectedServer } = useAppState()

  message.config({
    top: 10,
    duration: 2,
    maxCount: 1,
  });

  const options = serverList.map((server:Server) => ({
    label: `${server?.name}`,
    value: server?.id
  }))

  const headerStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px 0 0',
    background: '#fff'
  }

  const selectionStyles = {
    minWidth: '250px',
  }

  if (!loggedInUser) {
    return <LoginPage />
  }

  return (
    <Layout>
      <Header style={headerStyle}>
          <div style={{ padding: '0 10px'}}>
            <Link href="/">
              <Image src="favicon.svg" width={25} height={50} alt="" style={{ marginTop: '25px'}} />
            </Link>
          </div>
          <Menu />
          <Flex gap="small" justify='flex-end' style={{flexGrow: '1'}}>
            {hasPermission('modify_server') && <CreateServerModal />}
            <Select
              options={options}
              style={selectionStyles}
              onChange={id => setSelectedServer(serverList.find((item:Server) => item.id === id))}
              value={selectedServer?.id}
              placeholder="Select Server"
            />
            <Logout />
          </Flex>
      </Header>
      {children}
    </Layout>
  );
};

export default PageLayout;