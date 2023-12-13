export const KnifeRound = `
  sv_cheats 0;
  mp_ct_default_secondary "";
  mp_free_armor 1;
  mp_freezetime 10;
  mp_give_player_c4 0;
  mp_maxmoney 0;
  mp_respawn_immunitytime 0;
  mp_respawn_on_death_ct 0;
  mp_respawn_on_death_t 0;
  mp_roundtime 1.92;
  mp_roundtime_defuse 1.92;
  mp_roundtime_hostage 1.92;
  mp_t_default_secondary "";
  mp_round_restart_delay 3;
  mp_team_intro_time 0;
  say Knife!;
  say Knife!;
  say Knife!;
  say Knife!;
  say Knife!;
  say Knife!;
  mp_restartgame 1;
  mp_warmup_end;
`

export const Warmup = `
  bot_kick;
  sv_cheats 0;
  bot_quota 0;
  mp_autokick 0;
  mp_autoteambalance 0;
  mp_buy_anywhere 0;
  mp_buytime 15;
  mp_death_drop_gun 0;
  mp_free_armor 0;
  mp_ignore_round_win_conditions 0;
  mp_limitteams 0;
  mp_radar_showall 0;
  mp_respawn_on_death_ct 0;
  mp_respawn_on_death_t 0;
  mp_solid_teammates 0;
  mp_spectators_max 20;
  mp_maxmoney 16000;
  mp_startmoney 16000;
  mp_timelimit 0;
  sv_alltalk 0;
  sv_auto_full_alltalk_during_warmup_half_end 0;
  sv_coaching_enabled 1;
  sv_competitive_official_5v5 1;
  sv_deadtalk 1;
  sv_full_alltalk 0;
  sv_grenade_trajectory 0;
  sv_hibernate_when_empty 0;
  mp_weapons_allow_typecount -1;
  sv_infinite_ammo 0;
  sv_showimpacts 0;
  sv_voiceenable 1;
  sm_cvar sv_mute_players_with_social_penalties 0;
  sv_mute_players_with_social_penalties 0;
  tv_relayvoice 1;
  sv_cheats 0;
  mp_ct_default_melee weapon_knife;
  mp_ct_default_secondary weapon_hkp2000;
  mp_ct_default_primary "";
  mp_t_default_melee weapon_knife;
  mp_t_default_secondary weapon_glock;
  mp_t_default_primary;
  mp_maxrounds 24;
  mp_warmup_start;
  mp_warmup_pausetimer 1;
  mp_warmuptime 9999;
  cash_team_bonus_shorthanded 0;
  cash_team_loser_bonus_shorthanded 0;
  say Warmup!
  say Warmup!
  say Warmup!
`

export const Practice = `
  sv_grenade_trajectory_prac_pipreview 1;
  sv_grenade_trajectory_prac_trailtime 4;
  mp_buy_anywhere 1;
  mp_freezetime 0;
  mp_ignore_round_win_conditions 1;
  mp_buytime 99999;
  mp_startmoney 60000;
  mp_maxmoney 60000;
  ammo_grenade_limit_total 6;
  mp_warmup_pausetimer 1;
  mp_warmup_start;
  sv_cheats 1;
  sv_infinite_ammo 2;
  bot_kick;
  say Practice Mode!
  say Practice Mode!
  say Practice Mode!
`

export const DefaultCommands = [{
  id: 'knife',
  name: 'Knife Round',
  promt: KnifeRound,
}, {
  id: 'warmup',
  name: 'Warmup',
  promt: Warmup,
}, {
  id: 'practice',
  name: 'Practice',
  promt: Practice,
}]