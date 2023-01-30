export type UserAuth = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string|string[];
}

export type ChannelInfo = {
  broadcaster_id: string;
  broadcaster_login: string;
  broadcaster_name: string;
  broadcaster_language: string;
  game_id: string;
  game_name: string;
  title: string;
  delay: string;
  tages: string[];
}

export type AppAuth = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export type UpdateChannelInfo = {
  game_id?: string;
  broadcaster_language?: string;
  title?: string;
  delay?: number;
  tags?: string[];
};

export type ViewerList = {
  broadcaster: Array<string>;
  vips: Array<string>;
  moderators: Array<string>;
  staff: Array<string>;
  admins: Array<string>;
  global_mods: Array<string>;
  viewers: Array<string>;
};
