import { useState } from 'react'
import { PlusSquareTwoTone, EditTwoTone } from '@ant-design/icons'
import { Button, Divider, Modal } from 'antd'
import FormServer from './Form'

const ModalFormServer = ({
  server,
  buttonText = 'add server',
  type = 'add'
}:any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true)

  const handleCancel = () => setIsModalOpen(false)

  const buttonIcon = type === 'add' ? <PlusSquareTwoTone /> : <EditTwoTone />

  return (
    <>
      <Button type='link' icon={buttonIcon} onClick={showModal}>
        {buttonText}
      </Button>
      <Modal title={`${buttonText} server`} footer={null} open={isModalOpen} onCancel={handleCancel}>
        <Divider />
        <FormServer
          buttonText={type !== 'add' ? 'update' : buttonText}
          type={type}
          server={server}
          onSubmit={handleCancel}
        />
      </Modal>
    </>
  )
}

export default ModalFormServer
