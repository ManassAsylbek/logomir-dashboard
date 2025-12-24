export interface UserRegisterRequest {
  username?: string;
  full_name?: string;
  age?: number;
  gender?: string;
  is_child?: boolean;
  tariff_id?: number;
  fcm_token?: string;
  password: string;
  roles?: string;
}

export interface UserRegisterResponse {
  username?: string;
  full_name?: string;
  age?: number;
  gender?: string;
  is_child?: boolean;
  tariff_id?: number;
  fcm_token?: string;
  roles?: string;
}

export interface ValidateUsernameRequest {
  username: string;
}

export interface ValidateOtpRequest {
  username: string;
  code: string;
}
