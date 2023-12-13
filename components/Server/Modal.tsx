import { useState } from 'react'
import { Button, Divider, Modal } from 'antd'
import CreateServerForm from './Form'

const CreateServerModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true)

  const handleCancel = () => setIsModalOpen(false)

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Server
      </Button>
      <Modal title="Add Server" footer={null} open={isModalOpen} onCancel={handleCancel}>
        <Divider />
        <CreateServerForm onSubmit={handleCancel} />
      </Modal>
    </>
  )
}

export default CreateServerModal
