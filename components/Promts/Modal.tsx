import { useState } from 'react'
import { Divider, Modal } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import PromtForm from './Form'

const UserFormModal = ({ promt }:any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true)

  const handleCancel = () => setIsModalOpen(false)

  return (
    <>
      <EditTwoTone onClick={showModal} />
      <Modal title={`Update: ${promt.name}`} footer={null} open={isModalOpen} onCancel={handleCancel}>
        <Divider />
        <PromtForm promt={promt} buttonText="update" onSubmit={handleCancel} />
      </Modal>
    </>
  )
}

export default UserFormModal
