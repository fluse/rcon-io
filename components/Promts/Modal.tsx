import { useState } from 'react'
import { Divider, Modal } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import FormPromt from './Form'

const ModalUserForm = ({ promt }:any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true)

  const handleCancel = () => setIsModalOpen(false)

  return (
    <>
      <EditTwoTone onClick={showModal} />
      <Modal title={`Update: ${promt.name}`} footer={null} open={isModalOpen} onCancel={handleCancel}>
        <Divider />
        <FormPromt promt={promt} buttonText="update" onSubmit={handleCancel} />
      </Modal>
    </>
  )
}

export default ModalUserForm
