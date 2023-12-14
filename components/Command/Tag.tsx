import { Tag } from 'antd'

const StyledTag = ({ text, ...props }:any) => {
  const styles = {
    cursor: 'pointer'
  }
  return (
    <Tag style={styles} {...props}>
      {text}
    </Tag>
  )
}

export default StyledTag