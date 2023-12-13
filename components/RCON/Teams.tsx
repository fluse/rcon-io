import { useAppState } from '@/provider/AppState'
import { Button, Space } from 'antd'

const RconTeams = ({ server }:any) => {
  const { sendCommand } = useAppState()

  const send = async (command:any) => {
    sendCommand(server, command)
  }

  return (
    <>
      <Space wrap style={{ paddingBottom: '10px'}}>
        <Button type="primary" size="small" onClick={e => send('mp_swapteams; say teams swapped;')}>Swap Teams</Button>
        <Button type="primary" size="small" onClick={e => send('mp_scrambleteams; say team scramble;')}>Scramble Teams</Button>
      </Space>
      <Space wrap style={{ paddingBottom: '10px'}}>
        <Button type="primary" size="small" onClick={e => send('bot_add ct')}>Add Bot CT</Button>
        <Button type="primary" size="small" onClick={e => send('bot_add t')}>Add Bot T</Button>
        <Button type="primary" size="small" onClick={e => send('bot_kick')}>Kick bots</Button>
      </Space>
      <Space wrap style={{ paddingBottom: '10px'}}>
      <Button type="primary" size="small" onClick={e => send('game_type 0; game_mode 0;mp_restartgame 1;')}>Casual</Button>
        <Button type="primary" size="small" onClick={e => send('game_type 1; game_mode 2;sv_skirmish_id 0;mp_restartgame 1;')}>Deathmatch</Button>
        <Button type="primary" size="small" onClick={e => send('game_type 0; game_mode 1;mp_restartgame 1')}>Competitve</Button>
      </Space>  
      <Space wrap style={{ paddingBottom: '10px'}}>
        <Button type="primary" size="small" onClick={e => send('mp_pause_match')}>Pause match</Button>
        <Button type="primary" size="small" onClick={e => send('mp_unpause_match')}>Resume match</Button>
      </Space>

      <Space wrap>
        <Button type="primary" size="small" onClick={e => send('mp_pause_match')}>Pause match</Button>
        <Button type="primary" size="small" onClick={e => send('mp_buy_allow_guns 1; bot_pistols_only 1;')}>Pistols only</Button>
        <Button type="primary" size="small" onClick={e => send('mp_buy_allow_guns 255; bot_pistols_only 0;')}>Pistols off</Button>
        <Button type="primary" size="small" onClick={e => send('mp_damage_headshot_only 1')}>Headshot only</Button>
        <Button type="primary" size="small" onClick={e => send('mp_damage_headshot_only 0')}>Headshot only off</Button>
      </Space>
    </>
  )
}

export default RconTeams;