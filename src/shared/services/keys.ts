import { getKey } from "../helpers/getKey";

export const KEYS_AUTH = {
  auth: getKey("AUTH", "MUTATION"),
};

export const KEYS_REGISTRATION_STEP1 = {
  registration: getKey("REGISTRATION", "MUTATION"),
};

export const KEYS_REGISTRATION_STEP3 = {
  registration: getKey("REGISTRATION", "MUTATION"),
};

export const KEYS_EMAIL_VERIFICATION_SEND = {
  email_verification_send: getKey("EMAIL_VERIFICATION_SEND", "MUTATION"),
};

export const KEYS_EMAIL_VERIFICATION_CONFIRM = {
  email_verification_confirm: getKey(
    "KEYS_EMAIL_VERIFICATION_CONFIRM",
    "MUTATION"
  ),
};

export const KEYS_GET_COMPANY = {
  getCompany: getKey("KEYS_GET_COMPANY", "QUERY"),
};
