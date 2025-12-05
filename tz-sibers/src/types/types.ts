export interface User {
  id: number;
  name: string;
  avatar: string;
  username: string;
}

export interface UserPreview {
  id: number;
  name: string;
}

export interface Chat {
  id: number;
  name: string;
  members: UserPreview[];
  lastMessage?: string;
}