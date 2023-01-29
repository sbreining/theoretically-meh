export type AccessResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string|string[];
}

export type ChannelInfo = {
  game_id?: string;
  broadcaster_language?: string;
  title?: string;
  delay?: number;
  tags?: string[];
};

export type Token = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
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
