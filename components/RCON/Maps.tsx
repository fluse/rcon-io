import { useAppState } from '@/provider/AppState'
import { Space, Select } from 'antd'

const RconTeams = ({ server }) => {
  const { mapList, sendCommand } = useAppState()

  const changeMap = (value, selected) => {
    console.log(value, selected)
    let command = `host_workshop_map ${selected.workshopId}`
    if (!('workshopId' in selected)) {
      command = `map ${selected.value}`
    }
    sendCommand(server, command)
  }

  const options = mapList.map((map) => ({
    label: map.name,
    value: map.filename || map.workshopId,
    ...map
  }))

  const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Space style={{ paddingTop: '10px', display: 'block', width: '100%' }}>
        <Select
          options={options}
          onChange={changeMap}
          filterOption={filterOption}
          showSearch
          placeholder="Change map"
          style={{ display: 'block', width: '100%' }}
        />
      </Space>
    </>
  )
}

export default RconTeams