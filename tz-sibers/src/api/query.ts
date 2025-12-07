import type { Chat } from '../types/types';
import { chatList } from '../types/chats';

export async function fetchChats(): Promise<Chat[]> {
  return chatList;
}

export async function createChat(chat: Chat): Promise<Chat> {
  chatList.push(chat);
  return chat;
}