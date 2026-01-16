export interface Answer {
  id?: string;
  name: string;
  is_correct: boolean;
}

export interface Word {
  id?: string;
  text: string;
  position: number;
}

export interface Sentence {
  id?: string;
  text: string;
  audio?: string;
  words: Word[];
}

export interface Question {
  id?: string;
  name: string;
  image?: string | null;
  answers: Answer[];
  sentence?: Sentence;
}

export interface Game {
  id: string;
  name: string;
  game_type: "Quiz";
  theme: string;
  creator: number;
  questions: Question[];
  allowed_users: number[];
  allowed_users_info: string;
}

export interface CreateGameRequest {
  name: string;
  game_type: "Quiz";
  theme: string;
  questions: Question[];
  allowed_users?: number[];
}

export interface UpdateGameRequest {
  name?: string;
  game_type?: "Quiz";
  theme?: string;
  questions?: Question[];
  allowed_users?: number[];
}

export interface GamesListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}
