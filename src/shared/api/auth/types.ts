export interface ValidateUsernameRequest {
  username: string;
}

export interface ValidateOtpRequest {
  username: string;
  code: string;
}

export interface UserRegisterRequest {
  username: string;
  password: string;
  full_name: string;
  age?: number;
  gender?: "Male" | "Female";
  is_child?: boolean;
}

export interface UserRegisterResponse {
  id?: number;
  username?: string;
  full_name?: string;
  age?: number;
  gender?: string;
  is_child?: boolean;
  roles?: string;
}
