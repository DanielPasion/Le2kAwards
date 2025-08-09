export type GameRow = {
  ppg: number;
  rpg: number;
  apg: number;
  spg: number;
  bpg: number;
  "3p": number;
  ft: number;
  fg: number;
  tpg: number;
  fpg: number;
  winPct: number;
  gp: number;
};

export type PlayerModel = {
  name: string;
  ign: string;
  pfp: string;
  stats: Record<string, GameRow[]>;
};
