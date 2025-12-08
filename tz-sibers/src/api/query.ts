import type { Chat, Message } from '../types/types';
import { chatList } from '../types/chats';

export async function fetchChats(): Promise<Chat[]> {
  return chatList;
}

export async function createChat(chat: Chat): Promise<Chat> {
  chatList.push(chat);
  return chat;
}

export async function addMessageToChat(chatId: number, message: Message): Promise<Message> {
  const chat = chatList.find(c => c.id === chatId);
  if (chat) {
    if (!chat.messages) {
      chat.messages = [];
    }
    chat.messages.push(message);
  }
  return message;
}

export async function deleteChat(chatId: number): Promise<number> {
  const index = chatList.findIndex(c => c.id === chatId);
  if (index !== -1) {
    chatList.splice(index, 1);
  }
  return chatId;
}

export async function addUserToChat(chatId: number, user: { id: number; name: string }): Promise<number> {
  const chat = chatList.find(c => c.id === chatId);
  if (chat) {
    const already = chat.members?.some(m => m.id === user.id);
    if (!already) {
      chat.members = [...(chat.members || []), { id: user.id, name: user.name }];
    }
  }
  return chatId;
}

export async function removeUserFromChat(chatId: number, memberId: number): Promise<number> {
  const chat = chatList.find(c => c.id === chatId);
  if (chat && chat.members) {
    chat.members = chat.members.filter(m => m.id !== memberId);
  }
  return memberId;
}