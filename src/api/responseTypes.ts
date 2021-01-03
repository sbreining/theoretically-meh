type ViewerList = {
  broadcaster: Array<string>;
  vips: Array<string>;
  moderators: Array<string>;
  staff: Array<string>;
  admins: Array<string>;
  global_mods: Array<string>;
  viewers: Array<string>;
};

type Token = {
  access_token: string;
  expires_in: number;
  token_type: string;
};
