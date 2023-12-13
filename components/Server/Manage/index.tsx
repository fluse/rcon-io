import { useState } from 'react'
import { Button, Divider, Popconfirm, message, Modal } from 'antd'

import { useAppState } from '@/provider/AppState'
import RconSay from '@/components/RCON/Say'
import RconTeams from '@/components/RCON/Teams'
import RconMaps from '@/components/RCON/Maps'

const ModalServerManage = ({ server }:any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true)

  const handleCancel = () => setIsModalOpen(false)

  return (
    <>
      <Button type="primary" onClick={showModal}>
        manage
      </Button>
      <Modal title={`Manage: ${server.name}`} footer={null} open={isModalOpen} onCancel={handleCancel}>
        <Divider />
        <RconTeams server={server} />
        <RconSay server={server} />
        <RconMaps server={server} />
      </Modal>
    </>
  )
}

export default ModalServerManage;
