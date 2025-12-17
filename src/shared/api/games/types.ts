export interface Answer {
  id: number;
  name: string;
  is_correct: boolean;
}

export interface Question {
  id: number;
  name: string;
  image?: string | null;
  answers: Answer[];
}

export interface Game {
  id: number;
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
  allowed_users?: number[];
}

export interface UpdateGameRequest {
  name?: string;
  game_type?: "Quiz";
  theme?: string;
  allowed_users?: number[];
}

export interface GamesListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}
