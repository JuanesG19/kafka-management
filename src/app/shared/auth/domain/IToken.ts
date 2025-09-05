export interface ITokenRequest {
  uuid: string;
}

export interface ITokenResponse {
  token: string;
  key: string;
}

export interface ITokenKeycloackResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  not_before_policy: number;
  session_state: string;
  scope: string;
}
