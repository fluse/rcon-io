import { useState } from 'react'
import { PlusSquareTwoTone } from '@ant-design/icons'
import { Button, Divider, Modal } from 'antd'
import CreateServerForm from './Form'

const CreateServerModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true)

  const handleCancel = () => setIsModalOpen(false)

  return (
    <>
      <Button type='link' icon={<PlusSquareTwoTone />} onClick={showModal}>
        Server
      </Button>
      <Modal title="Add Server" footer={null} open={isModalOpen} onCancel={handleCancel}>
        <Divider />
        <CreateServerForm onSubmit={handleCancel} />
      </Modal>
    </>
  )
}

export default CreateServerModal
