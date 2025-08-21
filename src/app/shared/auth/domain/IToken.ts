export interface ITokenRequest {
  uuid: string;
}

export interface ITokenResponse {
  token: string;
  key: string;
}

export interface ITokenKeycloackResponse {
  access_token: string;
}
