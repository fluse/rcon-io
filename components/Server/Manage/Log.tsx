import { useState } from 'react'
import { Button, Timeline, Popconfirm, message, Modal } from 'antd'

const ServerLog = ({ server }:any) => {
  const items = server.log.map((entry:any) => ({
    children: entry
  }))

  return (
    <>
      <Timeline items={items} />
    </>
  )
}

export default ServerLog;
