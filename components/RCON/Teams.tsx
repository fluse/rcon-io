import { useAppState } from '@/provider/AppState'
import { Divider, Form } from 'antd'

import { Test } from '@/config/promts'

import StyledTag from '../Promts/Tag'

const RconTeams = ({ server }:any) => {
  const { sendCommand } = useAppState()

  const send = async (command:any) => {
    sendCommand(server, command)
  }

  const layoutConfig = [{
    name: 'Teams',
    items: [{
        text: 'swap',
        promt: 'mp_swapteams; say teams swapped;'
      }, {
        text: 'scramble',
        promt: 'mp_scrambleteams; say team scramble;'
    }]
  }, {
    name: 'Bots',
    items: [{
        text: 'add to CT',
        promt: 'bot_add ct'
      }, {
        text: 'add to T',
        promt: 'bot_add t'
    }, {
      text: 'kick all',
      promt: 'bot_kick'
    }]
  }, {
    name: 'Game Modes',
    items: [{
        text: 'Casual',
        promt: 'game_type 0; game_mode 0;mp_restartgame 1;'
      }, {
        text: 'Deathmatch',
        promt: 'game_type 1; game_mode 2;sv_skirmish_id 0;mp_restartgame 1;'
    }, {
      text: 'Competitve',
      promt: 'game_type 0; game_mode 1;mp_restartgame 1'
    }, {
      text: 'Wingman',
      promt: 'game_type 0; game_mode 2;mp_restartgame 1'
    }, {
      text: 'Armsrace',
      promt: 'game_type 1; game_mode 0;mp_randomspawn 1;mp_randomspawn_los 1;mp_restartgame 1'
    }]
  }, {
    name: 'Configs',
    items: [{
      text: 'Warmup',
      promt: Test.replace(/(\r\n|\n|\r)/gm,""),
    }]
  },{
    name: 'Match',
    items: [{
        text: 'pause',
        promt: 'sv_cheats 1; sv_pausable 1; pause;mp_pause_match; say Pause Game'
      }, {
        text: 'unpause',
        promt: 'mp_unpause_match'
    }]
  }, {
    name: 'Pistol Only',
    items: [{
        text: 'on',
        promt: 'mp_buy_allow_guns 1; bot_pistols_only 1;mp_free_armor 0;say Pistol Only: On;'
      }, {
        text: 'off',
        promt: 'mp_buy_allow_guns 255; bot_pistols_only 0;mp_free_armor 2;say Pistol Only: Off;'
    }]
  }, {
    name: 'Headshot Only',
    items: [{
        text: 'on',
        promt: 'mp_damage_headshot_only 1;say Headshot Only: On;'
      }, {
        text: 'off',
        promt: 'mp_damage_headshot_only 0;say Headshot Only: Off;'
    }]
  }, {
    name: 'Player Speed',
    items: [{
      text: 'Bullettime',
      promt: 'host_timescale 0.5;'
    }, {
      text: 'Normal',
      promt: 'host_timescale 1;'
    }, {
      text: 'Fast',
      promt: 'host_timescale 1.3;'
    }, {
      text: 'Highspeed',
      promt: 'host_timescale 1.6;'
    }]
  }, {
    name: 'Chicken',
    items: [{
      text: 'spawn chicken',
      promt: 'ent_create chicken;'
    }]
  }, {
    name: 'Weapon Spray',
    items: [{
      text: 'on',
      promt: 'weapon_accuracy_nospread 0;'
    }, {
      text: 'off',
      promt: 'weapon_accuracy_nospread 1;'
    }]
  }]

  const layoutItems = layoutConfig.map((layout) => (
    <>
      <Form.Item key={layout.name} label={layout.name} style={{marginBottom: '8px'}}>
        {layout.items.map((command) => (
          <StyledTag key={command.text} text={command.text} onClick={() => send(command.promt)} />
        ))}
      </Form.Item>
      <Divider dashed style={{ margin: '5px' }} />
    </>
  ))

  return (
    <>
      {layoutItems}
    </>
  )
}

export default RconTeams;