import { useState } from 'react'
import { Divider, Modal } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import UserForm from './Form'

const UserFormModal = ({ user }:any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true)

  const handleCancel = () => setIsModalOpen(false)

  return (
    <>
      <EditTwoTone onClick={showModal} />
      <Modal title={`Update: ${user.name}`} footer={null} open={isModalOpen} onCancel={handleCancel}>
        <Divider />
        <UserForm user={user} onSubmit={handleCancel} />
      </Modal>
    </>
  )
}

export default UserFormModal
