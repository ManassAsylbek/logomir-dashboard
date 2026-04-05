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
    "MUTATION",
  ),
};

export const KEYS_GET_COMPANY = {
  getCompany: getKey("KEYS_GET_COMPANY", "QUERY"),
};

export const KEYS_USER = {
  user: getKey("USER", "QUERY"),
};

export const KEYS_GAMES = {
  games: getKey("GAMES", "QUERY"),
  game: (id: string) => getKey(`GAME_${id}`, "QUERY"),
};

export const KEYS_SPECIALISTS = {
  specialists: getKey("SPECIALISTS", "QUERY"),
  specialist: (id: number) => getKey(`SPECIALIST_${id}`, "QUERY"),
};

export const KEYS_NEWS = {
  news: getKey("NEWS", "QUERY"),
  newsItem: (id: string) => getKey(`NEWS_${id}`, "QUERY"),
};

export const KEYS_PRESENTATIONS = {
  presentations: getKey("PRESENTATIONS", "QUERY"),
  presentation: (id: string) => getKey(`PRESENTATION_${id}`, "QUERY"),
};

export const KEYS_PAYMENTS = {
  payments: getKey("PAYMENTS", "QUERY"),
  payment: (id: string) => getKey(`PAYMENT_${id}`, "QUERY"),
};
